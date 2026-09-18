import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RectAreaLightUniformsLib} from 'three/addons/lights/RectAreaLightUniformsLib.js';

const $=id=>document.getElementById(id);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer=matchMedia('(pointer: coarse)').matches||navigator.maxTouchPoints>0;
const state={time:0,playing:false,camera:'cinematic',color:'#431523',screen:'art',loaded:false,hostVisible:window.parent===window,userPaused:false};
let model,mixer,action,phoneTilt,menu,art,timeline,filmCamera;
let duration=54;
const materials=new Map();
const originalColors=new Map();
const viewport=$('viewport');
const scene=new THREE.Scene();
scene.background=null;
const camera=new THREE.PerspectiveCamera(28,1,.002,10);
camera.position.set(0,.015,.48);
let renderer;

try{
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance',premultipliedAlpha:true});
}catch(error){
  $('loadMessage').textContent='Visualização 3D indisponível neste navegador';
  $('retry').hidden=false;
  throw error;
}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setClearColor(0x000000,0);
renderer.toneMapping=THREE.AgXToneMapping;
renderer.toneMappingExposure=1.05;
renderer.outputColorSpace=THREE.SRGBColorSpace;
viewport.append(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.dampingFactor=.1;
controls.enablePan=false;
controls.minDistance=.008;
controls.maxDistance=.95;
// MOBILE_PAGE_SCROLL_RELEASE_V2:
// On phones/tablets the page owns one-finger vertical gestures.
// Camera exploration remains available through CINE/TELA/3/4/LATERAL/TRÁS/LENTES
// and the real timeline, so the 3D section can never imprison page scrolling.
if(coarsePointer){
  controls.enabled=false;
  renderer.domElement.style.touchAction='pan-y';
}
controls.addEventListener('start',()=>{
  state.camera='free';
  state.playing=false;
  state.userPaused=true;
  updateCameraButtons();
  drawState();
});

const pmrem=new THREE.PMREMGenerator(renderer);
const env=new RoomEnvironment();
scene.environment=pmrem.fromScene(env,.025).texture;
scene.environmentIntensity=.65;
env.dispose();
pmrem.dispose();
RectAreaLightUniformsLib.init();
function area(color,intensity,w,h,x,y,z){
  const light=new THREE.RectAreaLight(color,intensity,w,h);
  light.position.set(x,y,z);
  light.lookAt(0,0,0);
  scene.add(light);
}
area(0xffe7df,4,.17,.25,-.17,.16,.2);
area(0xd8e5ff,3,.04,.22,.15,.02,.12);
area(0xffefeb,4,.12,.24,.10,.12,-.19);
area(0xe0eaff,3,.03,.22,-.16,.03,-.1);
scene.add(new THREE.HemisphereLight(0xe8efff,0x20232c,.34));

const target=new THREE.Vector3();
const desired=new THREE.Vector3();
const q=new THREE.Quaternion();
const presets={front:[0,.007,.44],quarter:[.30,.08,.34],side:[.46,.015,.005],rear:[.008,.015,-.44],macro:[-.028,.080,-.195]};

function resize(){
  const {width,height}=viewport.getBoundingClientRect();
  if(!width||!height)return;
  renderer.setSize(width,height,false);
  camera.aspect=width/height;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(viewport);
resize();

function cameraStep(snap=false){
  if(!state.loaded||state.camera==='free')return;
  const narrow=camera.aspect<1?1/Math.max(.60,camera.aspect):1;
  target.set(0,0,0);
  if(state.camera==='cinematic'&&filmCamera){
    model.updateMatrixWorld(true);
    filmCamera.getWorldPosition(camera.position);
    filmCamera.getWorldQuaternion(camera.quaternion);
    camera.fov=THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(filmCamera.fov/2))*Math.max(1,(16/9)/camera.aspect)));
    camera.near=.005;
    camera.far=2;
    camera.updateProjectionMatrix();
    const sample=timeline.cameraSamples[Math.min(timeline.cameraSamples.length-1,Math.round(state.time*timeline.fps))];
    if(sample?.target)controls.target.fromArray(sample.target);
    return;
  }
  if(phoneTilt){
    model.updateMatrixWorld(true);
    phoneTilt.getWorldQuaternion(q);
    phoneTilt.getWorldPosition(target);
    const base=new THREE.Vector3(...presets[state.camera]);
    if(state.camera==='macro'){
      const optic=model.getObjectByName('CAMERA_LENS_01_OPTICAL_DISC');
      if(optic)optic.getWorldPosition(target);
      base.set(.035,.022,-.12);
    }
    desired.copy(base.multiplyScalar(narrow).applyQuaternion(q)).add(target);
  }
  camera.fov=28;
  camera.updateProjectionMatrix();
  if(snap){
    camera.position.copy(desired);
    controls.target.copy(target);
  }else{
    camera.position.lerp(desired,.105);
    controls.target.lerp(target,.105);
  }
  controls.update();
}

function updateCameraButtons(){
  document.querySelectorAll('[data-camera]').forEach(button=>{
    const on=button.dataset.camera===state.camera;
    button.classList.toggle('selected',on);
    button.setAttribute('aria-pressed',String(on));
  });
}
function setCamera(name){
  if(name!=='free'&&name!=='cinematic'&&!presets[name])return;
  state.camera=name;
  if(name==='cinematic'){
    state.userPaused=false;
    if(state.loaded&&!reducedMotion)state.playing=true;
  }else{
    state.playing=false;
    state.userPaused=true;
  }
  updateCameraButtons();
  cameraStep(true);
  drawState();
}
function setColor(hex){
  if(!/^#[0-9a-f]{6}$/i.test(hex))return;
  state.color=hex;
  const c=new THREE.Color(hex);
  const lifts={BODY_COLOR:0,FRAME_COLOR:.08,CAMERA_COLOR:.025,BUTTON_COLOR:.10,LOGO_COLOR:.13};
  for(const [key,lift] of Object.entries(lifts)){
    const material=materials.get(key);
    if(!material)continue;
    if(hex.toLowerCase()==='#431523'&&originalColors.has(key))material.color.copy(originalColors.get(key));
    else material.color.copy(c).offsetHSL(0,0,lift*.7);
    material.needsUpdate=true;
  }
  document.querySelectorAll('[data-color]').forEach(button=>{
    const on=button.dataset.color.toLowerCase()===hex.toLowerCase();
    button.classList.toggle('selected',on);
    button.setAttribute('aria-pressed',String(on));
  });
  $('currentColor').style.setProperty('--current',hex);
}
function applyScreens(){
  if(!menu||!art)return;
  const menuOn=state.screen==='menu';
  const artOn=state.screen==='art';
  menu.visible=menuOn;
  art.visible=artOn;
  menu.position.z=art.position.z+.00015;
  menu.material.opacity=menuOn?1:0;
  art.material.opacity=artOn?1:0;
  if('emissiveIntensity' in menu.material)menu.material.emissiveIntensity=.85;
  if('emissiveIntensity' in art.material)art.material.emissiveIntensity=.85;
}
function setScreen(mode){
  if(!['off','menu','art'].includes(mode))return;
  state.screen=mode;
  document.querySelectorAll('[data-screen]').forEach(button=>{
    const on=button.dataset.screen===mode;
    button.classList.toggle('selected',on);
    button.setAttribute('aria-pressed',String(on));
  });
  applyScreens();
}
function timeText(t){
  const sec=Math.max(0,Math.floor(t));
  return `00:${String(sec).padStart(2,'0')}`;
}
function drawState(){
  if(!state.loaded)return;
  if(action){
    action.paused=false;
    action.enabled=true;
    mixer.setTime(Math.min(state.time,duration));
  }
  applyScreens();
  $('scrub').value=state.time;
  $('scrub').style.setProperty('--progress',`${Math.max(0,Math.min(100,state.time/duration*100))}%`);
  $('scrub').setAttribute('aria-valuetext',`${state.time.toFixed(1)} segundos`);
  $('time').innerHTML=`${timeText(state.time)} <span>/ 00:${String(Math.round(duration)).padStart(2,'0')}</span>`;
  const chapter=[...timeline.chapters].reverse().find(item=>state.time>=item.time);
  $('shotName').textContent=chapter?.label||'Frente · Mensagem Studio';
  $('play').innerHTML=state.playing?'<span aria-hidden="true">Ⅱ</span>':'<span aria-hidden="true">▶</span>';
  $('play').setAttribute('aria-label',state.playing?'Pausar animação':'Reproduzir animação');
}
function seek(value,pause=true){
  const t=Number(value);
  if(!Number.isFinite(t))return;
  state.time=THREE.MathUtils.clamp(t,0,duration);
  if(pause){
    state.playing=false;
    state.userPaused=true;
  }
  drawState();
  cameraStep(true);
}
function playPause(){
  if(!state.loaded)return;
  if(state.time>=duration)state.time=0;
  state.playing=!state.playing;
  state.userPaused=!state.playing;
  if(state.playing&&state.camera!=='cinematic'){
    state.camera='cinematic';
    updateCameraButtons();
  }
  drawState();
}

const closeMenus=except=>{
  if(except!=='camera'){$('cameraMenu').hidden=true;$('cameraToggle').setAttribute('aria-expanded','false');}
  if(except!=='color'){$('colorPalette').hidden=true;$('colorToggle').setAttribute('aria-expanded','false');}
  if(except!=='screen'){$('screenMenu').hidden=true;$('screenToggle').setAttribute('aria-expanded','false');}
};
$('cameraToggle').addEventListener('click',event=>{
  event.stopPropagation();
  const opening=$('cameraMenu').hidden;
  closeMenus('camera');
  $('cameraMenu').hidden=!opening;
  $('cameraToggle').setAttribute('aria-expanded',String(opening));
});
$('colorToggle').addEventListener('click',event=>{
  event.stopPropagation();
  const opening=$('colorPalette').hidden;
  closeMenus('color');
  $('colorPalette').hidden=!opening;
  $('colorToggle').setAttribute('aria-expanded',String(opening));
});
$('screenToggle').addEventListener('click',event=>{
  event.stopPropagation();
  const opening=$('screenMenu').hidden;
  closeMenus('screen');
  $('screenMenu').hidden=!opening;
  $('screenToggle').setAttribute('aria-expanded',String(opening));
});
document.addEventListener('click',()=>closeMenus());
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenus();});
document.querySelectorAll('[data-camera]').forEach(button=>button.addEventListener('click',()=>{setCamera(button.dataset.camera);closeMenus();}));
document.querySelectorAll('[data-color]').forEach(button=>button.addEventListener('click',()=>{setColor(button.dataset.color);closeMenus();}));
document.querySelectorAll('[data-screen]').forEach(button=>button.addEventListener('click',()=>{setScreen(button.dataset.screen);closeMenus();}));
$('play').addEventListener('click',playPause);
$('scrub').addEventListener('input',event=>seek(event.target.value));
$('retry').addEventListener('click',()=>location.reload());

window.addEventListener('message',event=>{
  const data=event.data||{};
  if(data.type!=='iphone-showcase-visibility')return;
  state.hostVisible=Boolean(data.visible);
  if(!state.hostVisible){
    state.playing=false;
  }else if(state.loaded&&!state.userPaused&&!reducedMotion){
    if(state.time>=duration)state.time=0;
    state.playing=true;
  }
  drawState();
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden)state.playing=false;
  else if(state.hostVisible&&state.loaded&&!state.userPaused&&!reducedMotion){if(state.time>=duration)state.time=0;state.playing=true;}
  drawState();
});

let last=performance.now();
renderer.setAnimationLoop(now=>{
  const dt=Math.min((now-last)/1000,.075);
  last=now;
  if(!state.hostVisible)return;
  if(state.loaded&&state.playing&&state.hostVisible&&!document.hidden){
    state.time+=dt;
    if(state.time>=duration){
      state.time=0;
      state.playing=true;
      state.userPaused=false;
    }
    drawState();
  }
  cameraStep();
  if(state.camera!=='cinematic')controls.update();
  renderer.render(scene,camera);
});
renderer.domElement.addEventListener('webglcontextlost',event=>{
  event.preventDefault();
  state.playing=false;
  $('loading').hidden=false;
  $('loadMessage').textContent='A visualização foi interrompida';
  $('retry').hidden=false;
});

async function load(){
  try{
    const response=await fetch('./assets/timeline.json');
    if(!response.ok)throw Error('Timeline indisponível');
    timeline=await response.json();
    duration=Number(timeline.duration)||54;
    $('scrub').max=duration;
    const gltf=await new GLTFLoader().loadAsync('./assets/iphone18_explodida.glb');
    model=gltf.scene;
    scene.add(model);
    model.traverse(object=>{
      if(!object.isMesh)return;
      const list=Array.isArray(object.material)?object.material:[object.material];
      for(const material of list){
        if(!material)continue;
        materials.set(material.name,material);
        if(material.color)originalColors.set(material.name,material.color.clone());
        if(material.map)material.map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
        if(material.emissiveMap)material.emissiveMap.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
      }
    });
    phoneTilt=model.getObjectByName('PHONE_TILT');
    filmCamera=model.getObjectByName('CAM_CINEMATIC');
    menu=model.getObjectByName('SCREEN_MENU');
    art=model.getObjectByName('SCREEN_ART');
    if(!phoneTilt||!filmCamera||!menu||!art||!gltf.animations.length)throw Error('Modelo incompleto');
    for(const object of [menu,art]){
      object.material=object.material.clone();
      object.material.transparent=true;
      object.material.depthWrite=false;
      object.material.side=THREE.FrontSide;
      object.material.needsUpdate=true;
      object.renderOrder=object===menu?2:3;
    }
    const menuImage=menu.material.emissiveMap||menu.material.map;
    menu.material=new THREE.MeshBasicMaterial({map:menuImage,transparent:true,opacity:0,depthWrite:false,side:THREE.FrontSide,toneMapped:false});
    mixer=new THREE.AnimationMixer(model);
    action=mixer.clipAction(gltf.animations[0]);
    action.setLoop(THREE.LoopOnce,1);
    action.clampWhenFinished=true;
    action.play();
    state.loaded=true;
    state.screen='art';
    $('loading').hidden=true;
    $('play').disabled=false;
    $('scrub').disabled=false;
    setColor(state.color);
    setScreen('art');
    drawState();
    cameraStep(true);
    if(state.hostVisible&&!reducedMotion){state.playing=true;drawState();}
    parent.postMessage({type:'iphone-showcase-ready'},'*');
  }catch(error){
    console.error('[iPhone showcase]',error);
    $('loadMessage').textContent='Não foi possível carregar o modelo 3D';
    $('retry').hidden=false;
  }
}
load();
