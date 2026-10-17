import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { loadGLBBytes } from '../hero-lossless-loader.mjs?v=20261017-lossless-v1';

// This renderer has no animation clock. The existing hero owns every pose.
const origin = location.origin;
let progress = 0;
let ready = false;
let applyProgress;

addEventListener('message', event => {
  if (event.source !== parent || event.origin !== origin) return;
  if (event.data?.type !== 'case3-character-progress') return;
  const value = Number(event.data.progress);
  if (!Number.isFinite(value)) return;
  progress = Math.max(0, Math.min(1, value));
  if (ready) applyProgress(progress);
});

function notify(type) {
  parent.postMessage({ type }, origin);
}

function smooth(a, b, p) {
  const t = Math.max(0, Math.min(1, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

try {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  document.body.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .01, 100);
  scene.add(new THREE.HemisphereLight(0xdde8ff, 0x626052, 2.6));
  for (const [position, color, intensity] of [
    [[2, 3, 4], 0xffead1, 3.5],
    [[-3, 1, 1], 0xd9edff, 2],
    [[0, 2, -3], 0xe9f3ff, 2.5]
  ]) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...position);
    scene.add(light);
  }

  const [gltf, yellow] = await Promise.all([
    loadGLBBytes(
      new URL('./CASE3_CHARACTER_ANIMATED.glb', import.meta.url),
      new URL('./CASE3_CHARACTER_ANIMATED.glb.gz', import.meta.url)
    ).then(buffer => new GLTFLoader().parseAsync(buffer, new URL('.', import.meta.url).href)),
    new THREE.TextureLoader().loadAsync('./CASE3_JACKET_MUSTARD_OVERLAY.webp')
      .catch(() => new THREE.TextureLoader().loadAsync('./CASE3_JACKET_MUSTARD_OVERLAY.png'))
  ]);
  const model = gltf.scene;
  const body = model.getObjectByName('CASE3_Character');
  const wings = [];
  model.traverse(object => {
    if (object.isMesh) {
      // All deformed poses are checked for framing below; no skeleton helpers
      // or control geometry are created or included by this renderer.
      object.frustumCulled = false;
      if (object.name.startsWith('CASE3_Wing')) wings.push(object);
    }
  });
  if (!body?.isMesh || wings.length !== 2 || !gltf.animations.length) {
    throw new Error('The Case3 character or animation is incomplete.');
  }
  scene.add(model);

  yellow.colorSpace = THREE.SRGBColorSpace;
  yellow.flipY = false;
  yellow.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const transformation = { value: 0 };
  body.material = body.material.clone();
  body.material.onBeforeCompile = shader => {
    shader.uniforms.case3YellowMap = { value: yellow };
    shader.uniforms.case3Green = transformation;
    shader.fragmentShader = 'uniform sampler2D case3YellowMap;\nuniform float case3Green;\n' + shader.fragmentShader;
    const overlayMap = THREE.ShaderChunk.map_fragment.replace(
      'vec4 sampledDiffuseColor = texture2D( map, vMapUv );',
      'vec4 originalSample = texture2D(map, vMapUv);\n' +
      'vec4 yellowSample = texture2D(case3YellowMap, vMapUv);\n' +
      'vec4 sampledDiffuseColor = vec4(mix(originalSample.rgb, yellowSample.rgb, (1.0-case3Green)*yellowSample.a), originalSample.a);'
    );
    shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', overlayMap);
  };
  body.material.customProgramCacheKey = () => 'case3-jacket-mustard-v1';

  let wingOpacity = 0;
  for (const wing of wings) {
    wing.material = wing.material.clone();
    // The GLB stores the invisible starting pose. Keep its base surface opaque;
    // visibility switches instantly while the original feather mask stays intact.
    wing.material.opacity = 1;
    wing.material.transparent = true;
    wing.material.forceSinglePass = true;
    wing.material.depthWrite = true;
  }

  const clip = gltf.animations[0];
  const startTime = Math.min(...clip.tracks.map(track => track.times[0]));
  const duration = clip.duration - startTime;
  if (!(duration > 0)) throw new Error('The Case3 animation has no duration.');
  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(clip).setLoop(THREE.LoopOnce, 1);
  action.clampWhenFinished = true;

  const timeline = Object.freeze({ firstTurnEnd: .40, wingPeak: .525, secondTurnStart: .65 });
  let currentPose;

  // Reuse the exported local rotation axes and skin. Only these upper-body
  // channels change; mesh geometry, weights, hips and legs stay in the source clip.
  function rotationControl(name, strength = 1) {
    const object = model.getObjectByName(name);
    const track = clip.tracks.find(track => track.name === `${name}.quaternion`);
    if (!object || !track) throw new Error(`The Case3 bone ${name} is missing.`);
    const sample = track.createInterpolant();
    const rest = new THREE.Quaternion().fromArray(sample.evaluate(startTime)).normalize();
    const end = new THREE.Quaternion().fromArray(sample.evaluate(startTime + duration)).normalize();
    const delta = rest.clone().invert().multiply(end).normalize();
    if (delta.w < 0) delta.set(-delta.x, -delta.y, -delta.z, -delta.w);
    const angle = 2 * Math.acos(THREE.MathUtils.clamp(delta.w, -1, 1));
    const axis = new THREE.Vector3(delta.x, delta.y, delta.z);
    if (axis.lengthSq() < 1e-12) axis.set(1, 0, 0);
    else axis.normalize();
    const rotation = new THREE.Quaternion();
    return {
      object, rest,
      apply(amount) {
        rotation.setFromAxisAngle(axis, angle * strength * amount);
        object.quaternion.copy(rest).multiply(rotation).normalize();
      }
    };
  }
  const arms = ['L', 'R'].flatMap(side => [
    rotationControl(`${side}_Clavicle`, 4 / 3),
    rotationControl(`${side}_Upperarm`, 40 / 25),
    rotationControl(`${side}_Forearm`, 10 / 7),
    rotationControl(`${side}_Hand`)
  ]);
  const wingControls = ['L', 'R'].flatMap(side => [
    rotationControl(`CASE3_WingRoot_${side}`),
    rotationControl(`CASE3_WingFan_${side}`)
  ]);
  const torso = ['Waist', 'Spine01', 'Spine02', 'Head'].map(name => rotationControl(name));

  function pose(p) {
    const { firstTurnEnd, wingPeak, secondTurnStart } = timeline;
    const first = Math.max(0, Math.min(1, p / firstTurnEnd));
    const second = Math.max(0, Math.min(1, (p - secondTurnStart) / (1 - secondTurnStart)));
    const armOpening = smooth(0, 1, first) * (1 - smooth(0, 1, second));
    const wingOpening = p < wingPeak ? smooth(firstTurnEnd, wingPeak, p) :
      1 - smooth(wingPeak, secondTurnStart, p);
    const sourceProgress = p < firstTurnEnd ? first * .5 :
      p < secondTurnStart ? .5 : .5 + second * (11 / 24);
    // reset().play() re-enables the action after reaching either endpoint,
    // allowing the existing page scroll to scrub backward without a jump.
    action.reset().play();
    // The root's rotation and translation use the same source time, preserving
    // its fixed pivot. It holds at 360 degrees throughout the wing movement.
    mixer.setTime(startTime + sourceProgress * duration);
    for (const control of arms) control.apply(armOpening);
    for (const control of torso) control.apply(armOpening);
    for (const control of wingControls) control.apply(wingOpening);
    const revealed = p >= firstTurnEnd;
    transformation.value = revealed ? 1 : 0;
    wingOpacity = revealed ? 1 : 0;
    for (const wing of wings) wing.visible = revealed;
    currentPose = {
      phase: p < firstTurnEnd ? 'first-turn' : p < wingPeak ? 'wings-opening' :
        p < secondTurnStart ? 'wings-closing' : 'second-turn',
      armOpening, wingOpening
    };
    model.updateMatrixWorld(true);
  }

  // Fixed framing from the complete motion keeps feet and open wings inside
  // the viewport on both tall desktop slots and wide mobile slots.
  const bounds = new THREE.Box3();
  const poseBounds = new THREE.Box3();
  const framingSamples = new Set([
    ...Array.from({ length: 49 }, (_, sample) => sample / 48),
    timeline.firstTurnEnd, timeline.wingPeak, timeline.secondTurnStart
  ]);
  for (const sample of framingSamples) {
    pose(sample);
    poseBounds.setFromObject(model, true);
    bounds.union(poseBounds);
  }
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());

  function resize() {
    const width = Math.max(1, document.documentElement.clientWidth);
    const height = Math.max(1, document.documentElement.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const vertical = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const horizontal = vertical * camera.aspect;
    const distance = Math.max(size.y / (2 * vertical), size.x / (2 * horizontal)) * 1.09 + size.z / 2;
    camera.position.set(center.x, center.y, center.z + distance);
    camera.near = Math.max(.001, distance / 100);
    camera.far = distance + size.length() * 3;
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    if (ready) applyProgress(progress);
  }

  applyProgress = p => {
    pose(p);
    renderer.render(scene, camera);
    document.documentElement.dataset.progress = p.toFixed(5);
  };

  // Internal inspection API for preview acceptance; it adds no product UI and
  // does not advance time independently of the page's existing scroll owner.
  const turnRootName = THREE.PropertyBinding.sanitizeNodeName('angelic warrior 3d model');
  const turnRoot = model.getObjectByName(turnRootName);
  const turnTrack = clip.tracks.find(track => track.name === `${turnRootName}.quaternion`);
  if (!turnRoot || !turnTrack) throw new Error('The Case3 turn root is missing.');
  const turnPrincipalAngles = [];
  const turnUnwrappedAngles = [];
  const sampleQuaternion = new THREE.Quaternion();
  const yawDegrees = q => THREE.MathUtils.radToDeg(Math.atan2(
    2 * (q.w * q.y + q.x * q.z),
    1 - 2 * (q.y * q.y + q.z * q.z)
  ));
  const wrapDegrees = value => ((value + 180) % 360 + 360) % 360 - 180;
  for (let index = 0; index < turnTrack.times.length; index++) {
    const principal = yawDegrees(sampleQuaternion.fromArray(turnTrack.values, index * 4));
    turnPrincipalAngles.push(principal);
    turnUnwrappedAngles.push(index === 0 ? principal :
      turnUnwrappedAngles[index - 1] + wrapDegrees(principal - turnPrincipalAngles[index - 1]));
  }
  window.MSCase3 = {
    setProgress(value) {
      const p = Number(value);
      if (!Number.isFinite(p)) return;
      progress = Math.max(0, Math.min(1, p));
      applyProgress(progress);
    },
    getState() {
      const currentBounds = new THREE.Box3();
      model.traverse(object => {
        if (!object.isMesh || !object.visible) return;
        currentBounds.expandByObject(object, true);
      });
      const projectedBounds = { min: [Infinity, Infinity], max: [-Infinity, -Infinity] };
      for (const x of [currentBounds.min.x, currentBounds.max.x]) {
        for (const y of [currentBounds.min.y, currentBounds.max.y]) {
          for (const z of [currentBounds.min.z, currentBounds.max.z]) {
            const point = new THREE.Vector3(x, y, z).project(camera);
            projectedBounds.min[0] = Math.min(projectedBounds.min[0], point.x);
            projectedBounds.min[1] = Math.min(projectedBounds.min[1], point.y);
            projectedBounds.max[0] = Math.max(projectedBounds.max[0], point.x);
            projectedBounds.max[1] = Math.max(projectedBounds.max[1], point.y);
          }
        }
      }
      // Recover the revolution count from the actual root keyframe prefix,
      // then add the current sampled quaternion's angle within that interval.
      let low = 0;
      let high = turnTrack.times.length - 1;
      while (low < high) {
        const middle = Math.ceil((low + high) / 2);
        if (turnTrack.times[middle] <= mixer.time) low = middle;
        else high = middle - 1;
      }
      const principalAngle = yawDegrees(turnRoot.quaternion);
      const turnAngle = turnUnwrappedAngles[low] + wrapDegrees(principalAngle - turnPrincipalAngles[low]);
      return {
        ready,
        progress,
        turnAngle,
        wingOpacity,
        wingVisible: wings.map(wing => wing.visible),
        greenFactor: transformation.value,
        ...currentPose,
        timeline,
        armAngles: arms.filter(control => control.object.name.endsWith('_Upperarm')).map(control =>
          THREE.MathUtils.radToDeg(control.rest.angleTo(control.object.quaternion))),
        wingRootAngles: wingControls.filter(control => control.object.name.includes('WingRoot')).map(control =>
          THREE.MathUtils.radToDeg(control.rest.angleTo(control.object.quaternion))),
        mixerTime: mixer.time,
        duration,
        turnRootName: turnRoot.name,
        turnTrackName: turnTrack.name,
        rootQuaternion: turnRoot.quaternion.toArray(),
        bounds: { min: currentBounds.min.toArray(), max: currentBounds.max.toArray() },
        animationBounds: { min: bounds.min.toArray(), max: bounds.max.toArray() },
        projectedBounds,
        viewport: [renderer.domElement.width, renderer.domElement.height],
        meshes: [body.name, ...wings.map(wing => wing.name)]
      };
    }
  };

  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    notify('case3-character-error');
  });
  renderer.domElement.addEventListener('webglcontextrestored', () => {
    applyProgress(progress);
    notify('case3-character-ready');
  });
  addEventListener('resize', resize);
  resize();
  ready = true;
  applyProgress(progress);
  document.documentElement.dataset.ready = 'true';
  notify('case3-character-ready');
} catch (error) {
  console.error('[Case3 character]', error);
  document.documentElement.dataset.ready = 'error';
  notify('case3-character-error');
}
