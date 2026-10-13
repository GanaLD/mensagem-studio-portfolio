import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {Octree} from 'three/addons/math/Octree.js';
import {Capsule} from 'three/addons/math/Capsule.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {SSAOPass} from 'three/addons/postprocessing/SSAOPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {createFootPlacement,createSeatedFootPlacement,spring} from './avatar-motion.mjs?v=20261012-web-fast-v1';
import {createEnvironmentInteractions} from './interactions.mjs?v=20261012-web-fast-v1';
import {partitionStaticScene} from './scene-chunks.mjs?v=20261012-web-fast-v1';
import {createHeroEmbedding} from './embedded-host.mjs?v=20261012-web-fast-v1';
import {createJumpController} from './jump-controller.mjs?v=20261012-web-fast-v1';
import {loadHouseAsset,versionedAssetURL} from './asset-loader.mjs?v=20261012-web-fast-v1';
import {buildOctreeCooperatively,createYieldBudget,yieldMainThread} from './async-octree.mjs?v=20261012-web-fast-v1';

const touch=matchMedia('(pointer:coarse)').matches;
const loadPerformance={startedAt:performance.now(),stages:{},longTasks:[],visualReadyMs:null,playerReadyMs:null};
window.__houseLoadPerformance=loadPerformance;
let longTaskObserver;
try{longTaskObserver=new PerformanceObserver(list=>{for(const entry of list.getEntries())if(loadPerformance.longTasks.length<200)loadPerformance.longTasks.push({startTime:entry.startTime,duration:entry.duration});});longTaskObserver.observe({type:'longtask',buffered:true});}catch{}
function startLoadStage(name){performance.mark('casa:'+name+':start');loadPerformance.stages[name]={startTime:performance.now()};}
function endLoadStage(name){const stage=loadPerformance.stages[name];if(stage){stage.durationMs=performance.now()-stage.startTime;performance.mark('casa:'+name+':end');performance.measure('casa:'+name,'casa:'+name+':start','casa:'+name+':end');}}

async function prepareTextures(root,name){
 const textures=new Set();root.traverse(object=>{
  for(const material of (Array.isArray(object.material)?object.material:[object.material]))if(material)
   for(const value of Object.values(material))if(value?.isTexture)textures.add(value);
 });
 startLoadStage(name);const budget=createYieldBudget(8);
 for(const texture of textures){renderer.initTexture(texture);const pending=budget.check();if(pending)await pending;}
 loadPerformance[name]={textures:textures.size,...budget.finish()};endLoadStage(name);
 await yieldMainThread();
}

let preparingGraphics=false;
async function prepareDraws(root,name){
 const all=[],selected=new Set();scene.traverse(object=>{if(object.isMesh)all.push([object,object.layers.mask]);});
 root.traverse(object=>{if(object.isMesh)selected.add(object);});
 const meshes=all.filter(([object,mask])=>selected.has(object)&&object.visible&&(mask&camera.layers.mask));
 let maximumDrawMs=0;preparingGraphics=true;startLoadStage(name);
 try{
  for(const [object]of all)object.layers.mask=0;
  for(let index=0;index<meshes.length;index+=48){
   const batch=meshes.slice(index,index+48);for(const [object,mask]of batch)object.layers.mask=mask;
   sun.shadow.needsUpdate=true;const started=performance.now();renderer.render(scene,camera);maximumDrawMs=Math.max(maximumDrawMs,performance.now()-started);
   for(const [object]of batch)object.layers.mask=0;
   await yieldMainThread();
  }
 }finally{
  for(const [object,mask]of all)object.layers.mask=mask;
  sun.shadow.needsUpdate=true;preparingGraphics=false;endLoadStage(name);
  loadPerformance[name]={meshes:meshes.length,batches:Math.ceil(meshes.length/48),maximumDrawMs,originalLayersRestored:all.every(([object,mask])=>object.layers.mask===mask)};
 }
}

const renderer = new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)); renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.04;
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);
const scene=new THREE.Scene(); scene.background=new THREE.Color('#c7b79b'); scene.fog=new THREE.FogExp2('#c7b79b',.0008);
const pmrem=new THREE.PMREMGenerator(renderer);
scene.add(new THREE.HemisphereLight(0xe5efff,0xb39a78,.78));
const sun=new THREE.DirectionalLight(0xffca87,2.5); sun.position.set(-65,20,-48); sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048); Object.assign(sun.shadow.camera,{left:-45,right:45,top:45,bottom:-45,far:160}); sun.shadow.normalBias=.035;sun.shadow.bias=-.0005; scene.add(sun);
const sky=new THREE.Mesh(new THREE.SphereGeometry(2100,24,12),new THREE.ShaderMaterial({name:'GoldenHourAtmosphere',side:THREE.BackSide,depthWrite:false,uniforms:{sunDirection:{value:sun.position.clone().normalize()},zenith:{value:new THREE.Color('#8299b6')},horizon:{value:new THREE.Color('#e9c59a')},warm:{value:new THREE.Color('#ffc47c')}},vertexShader:'varying vec3 skyWorld;void main(){vec4 p=modelMatrix*vec4(position,1.0);skyWorld=p.xyz;gl_Position=projectionMatrix*viewMatrix*p;}',fragmentShader:`
 varying vec3 skyWorld;uniform vec3 sunDirection;uniform vec3 zenith;uniform vec3 horizon;uniform vec3 warm;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
 void main(){vec3 d=normalize(skyWorld-cameraPosition);float elevation=max(0.0,d.y);vec3 c=mix(horizon,zenith,pow(elevation,.43));float alignment=max(0.0,dot(d,sunDirection));c+=warm*pow(alignment,28.0)*.24;float disk=smoothstep(.99990,.99996,alignment);c+=vec3(5.5,3.6,1.7)*disk;vec2 q=d.xz/max(.12,d.y+.12);float n=noise(q*2.4)*.55+noise(q*5.1)*.28+noise(q*10.8)*.17;float clouds=smoothstep(.61,.80,n)*smoothstep(.02,.14,d.y)*(1.0-smoothstep(.55,.9,d.y));c=mix(c,mix(vec3(.92,.88,.80),warm,alignment*.45),clouds*.5);if(d.y<0.0)c=mix(c,vec3(.35,.32,.25),min(1.0,-d.y*4.0));gl_FragColor=vec4(c,1.0);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}));sky.name='RUNTIME_GoldenHourSky';sky.renderOrder=-1;sky.frustumCulled=false;scene.add(sky);
const reflectionSky=new THREE.Scene();reflectionSky.add(sky.clone());scene.environment=pmrem.fromScene(reflectionSky,.035,.1,2500).texture;scene.environmentIntensity=.42;
const camera=new THREE.PerspectiveCamera(53,innerWidth/innerHeight,.05,5000);
const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
composer.renderTarget1.samples=2;composer.renderTarget2.samples=2;
const aoScale=.65;
const contactAO=new SSAOPass(scene,camera,innerWidth*aoScale,innerHeight*aoScale,16);
contactAO.kernelRadius=.42;contactAO.minDistance=.000004;contactAO.maxDistance=.00006;
composer.addPass(contactAO);composer.addPass(new OutputPass());
const transparentMeshes=[];
const renderAO=contactAO.render.bind(contactAO);
contactAO.render=(...args)=>{const hidden=transparentMeshes.filter(o=>o.visible);for(const mesh of hidden)mesh.visible=false;try{renderAO(...args);}finally{for(const mesh of hidden)mesh.visible=true;}};
function sizeComposer(){composer.setSize(innerWidth,innerHeight);contactAO.setSize(Math.round(innerWidth*aoScale),Math.round(innerHeight*aoScale));}
sizeComposer();sun.shadow.autoUpdate=false;sun.shadow.needsUpdate=true;
const fromBlender=v=>new THREE.Vector3(v[0],v[2],-v[1]);
const HERO_SECONDS=14, RADIUS=.23, HEIGHT=1.78, EYE_HEIGHT=1.64, WALK_SPEED=1.633, RUN_SPEED=3.5;
const ui=Object.fromEntries(['introMode','scrollMode','freeMode','hint','roomTitle','progress','handoff','loading','loadText','signalTitle','signalHint','controlHint','interactionHint','interactionText','interactionAction'].map(id=>[id,document.getElementById(id)]));
ui.controlHint.textContent=touch?'Setas · andar · arraste para olhar · Correr · Pular · Interagir':'WASD · andar · Shift · correr · Espaço · pular · E · interagir';
const rooms={
 living:{p:[-.65,17.5,.07],t:[-.1,9,1.64],title:'Sala · exploração livre'},
 kitchen:{p:[4.2,8.05,.07],t:[2.3,5.5,1.1],title:'Cozinha integrada'},
 pool:{p:[-8.3,-5,.07],t:[-8.3,-10,1.1],title:'Piscina e varanda'},
 closet:{p:[2.3,-20.2,.07],t:[5.9,-20,1.4],title:'Closet da suíte'},
 garage:{p:[15.6,-6.9,4.22],t:[9.4,-6.9,4.7],title:'Garagem · Countach'}
};
let mode='loading',route=[],progress=0,heroCompleted=false,introElapsed=0,last=performance.now(),collisionLoadPromise=null,collisionTaskController=null;
let yaw=-2.20,pitch=0,pointer=null,wheelStep=0,walkBlend=0,runBlend=0,playerModel,mixer,idleAction,walkAction,runAction,jumpAction,jumpController,jumpBlend=0,modelBaseY=0,footPlacement,seatedFootPlacement,interactions,interactionMetadata={},vehicleBounds,environmentRoot,playerReady=false,playerLoadPromise=null;
const interactionActions={};let playerClipNames=[];
let cameraMode='first',heroPath,heroTargets,viewTransition=0;
const velocity=new THREE.Vector3(),eyeSpring={value:0,velocity:0},bodySpring={value:0,velocity:0};
const lookRotation=new THREE.Quaternion(),lookEuler=new THREE.Euler(0,0,0,'YXZ');
const keys=new Set(),physicsKeys=new Set(),inputChanges=[],player=new THREE.Group(); player.name='PLAYER_Control'; scene.add(player);
const bones={},octree=new Octree(); octree.trianglesPerLeaf=24;octree.maxLevel=10;
const dynamicSeatColliders=[];
const capsule=new Capsule(),ray=new THREE.Ray(),normal=new THREE.Vector3(), axisX=new THREE.Vector3(1,0,0);
const down=new THREE.Vector3(0,-1,0),up=new THREE.Vector3(0,1,0), temp=new THREE.Vector3(),desiredCamera=new THREE.Vector3(),focus=new THREE.Vector3();
let collisionTriangleCount=0,movedLastFrame=0,blockedLastMove=false,lastShadowUpdate=0,lastVisualMotion=0;
const introCamera=new THREE.Vector3(),introTarget=new THREE.Vector3();
function dismissHandoff(){ui.handoff.hidden=true;}
const viewButton=document.getElementById('viewMode');
function setViewMode(value){
 if(!['first','third'].includes(value))return;
 cameraMode=value;viewTransition=.35;
 sun.shadow.needsUpdate=true;
 viewButton.textContent=value==='first'?'Ver personagem · V':'Primeira pessoa · V';
 viewButton.setAttribute('aria-label',value==='first'?'Mudar para terceira pessoa':'Mudar para primeira pessoa');
}
viewButton.onclick=()=>setViewMode(cameraMode==='first'?'third':'first');
function updateModeUI(){
 document.body.dataset.mode=mode;
 for(const n of ['intro','scroll','free'])ui[`${n}Mode`].setAttribute('aria-pressed',String(mode===n));
 ui.introMode.textContent=mode==='intro'?'Reiniciar sobrevoo':'Repetir sobrevoo';
 ui.signalTitle.textContent=mode==='scroll'?'Role para controlar':'Sobrevoo automático';
 ui.signalHint.textContent=mode==='scroll'?'Ao chegar, caminhe pelo ambiente':'A exploração começa ao chegar';
 ui.hint.textContent=mode==='free'?(touch?'Setas para caminhar · arraste para olhar':'W/A/S/D para caminhar · arraste para olhar'):mode==='scroll'?'Role para acompanhar o percurso':'Sua visita começa automaticamente';
}
function setMode(next){
 if(!playerReady||!['intro','scroll','free'].includes(next))return;
 if(next==='intro'){startIntro();return;}
 if(next==='free'&&mode!=='free'){finishIntro();return;}
 if(next!=='free')interactions?.reset();
 mode=next;resetFrameClock();dismissHandoff();
 if(next==='scroll'){progress=0;heroCompleted=false;setViewMode('first');viewTransition=0;placePlayer('living');}
 updateModeUI();window.scrollTo(0,0);
}
function startIntro(){
 if(!playerReady)return;
 interactions?.reset();
 mode='intro';introElapsed=0;progress=0;heroCompleted=false;resetFrameClock();dismissHandoff();
 setViewMode('first');viewTransition=0;placePlayer('living');updateModeUI();window.scrollTo(0,0);sample(0);ui.progress.style.width='0%';last=performance.now();
}
function finishIntro(){
 if(mode==='free')return;
 sample(1);progress=1;mode='free';heroCompleted=true;resetFrameClock();
 updateModeUI();window.scrollTo(0,0);ui.roomTitle.textContent='Sala · exploração livre';ui.progress.style.width='100%';ui.handoff.hidden=false;
}
function applyEmbeddedState(state){
 if(!window.__visualReady)return;
 if(state.active&&state.progress>=.72&&!playerReady)ensurePlayerReady().catch(reportLoadingFailure);
 if(state.explore){
  if(!playerReady)return;
  if(mode!=='free')finishIntro();
  ui.handoff.hidden=true;
  return;
 }
 if(mode==='free'&&playerReady){
  interactions?.reset();setViewMode('first');viewTransition=0;placePlayer('living');
 }
 if(mode!=='embedded'||!state.active)resetFrameClock();
 mode='embedded';progress=state.progress;heroCompleted=progress>=.999;
 document.body.dataset.mode='embedded';ui.handoff.hidden=true;
 sample(progress);updateProgress();
 if(playerModel)playerModel.visible=camera.position.distanceTo(player.position.clone().add(new THREE.Vector3(0,EYE_HEIGHT,0)))>.65;
}
const embedding=createHeroEmbedding({applyState:applyEmbeddedState,releaseInput:resetFrameClock});
function rawFloorAt(x,z,y){
 ray.set(new THREE.Vector3(x,y+.26,z),down);
 const hit=octree.rayIntersect(ray);
 if(!hit||hit.distance>.66||hit.triangle.getNormal(normal).y<.55)return null;
 return hit.position.y;
}
function floorAt(x,z,y){
 const direct=rawFloorAt(x,z,y);if(direct!==null)return direct;
 // Bridge a bevel or a narrow tread joint only when real support exists
 // on both sides. An open terrace edge still fails the support check.
 for(const [dx,dz] of [[.025,0],[0,.025]]){
  const a=rawFloorAt(x-dx,z-dz,y),b=rawFloorAt(x+dx,z+dz,y);
  if(a!==null&&b!==null&&Math.abs(a-b)<.20)return Math.max(a,b);
 }
 return null;
}
function supportAt(p){
 // The footprint must remain over a real floor. Water and scenery are not walkable.
 let highest=-Infinity,lowest=Infinity;
 for(const [x,z] of [[0,0],[RADIUS,0],[-RADIUS,0],[0,RADIUS],[0,-RADIUS]]){
  const y=floorAt(p.x+x,p.z+z,p.y);if(y===null)return null;
  highest=Math.max(highest,y);lowest=Math.min(lowest,y);
 }
 // The footprint may straddle two 17.5 cm risers. A single move remains
 // limited to 27 cm below; the full capsule radius must see the first riser.
 return highest-lowest>.37?null:highest+.007;
}
function setCapsule(p){capsule.start.set(p.x,p.y+RADIUS+.01,p.z);capsule.end.set(p.x,p.y+HEIGHT-RADIUS,p.z);capsule.radius=RADIUS;}
function resolveDynamicSeats(p){
 for(const item of dynamicSeatColliders){
  const offset=item.node.getWorldPosition(temp).sub(item.origin),box=item.box.clone().translate(offset);
  if(p.y+HEIGHT<box.min.y||p.y+.02>box.max.y)continue;
  const closestX=THREE.MathUtils.clamp(p.x,box.min.x,box.max.x),closestZ=THREE.MathUtils.clamp(p.z,box.min.z,box.max.z),dx=p.x-closestX,dz=p.z-closestZ,distance=Math.hypot(dx,dz);
  if(distance>=RADIUS+.002)continue;
  if(distance>.0001){p.x+=dx/distance*(RADIUS+.002-distance);p.z+=dz/distance*(RADIUS+.002-distance);}
  else{
   const choices=[[box.min.x-RADIUS-.002-p.x,0],[box.max.x+RADIUS+.002-p.x,0],[0,box.min.z-RADIUS-.002-p.z],[0,box.max.z+RADIUS+.002-p.z]].sort((a,b)=>Math.hypot(...a)-Math.hypot(...b));p.x+=choices[0][0];p.z+=choices[0][1];
  }
 }
 return p;
}
function resolvePosition(p){
 const trial=p.clone();
 const initialFloor=supportAt(trial);if(initialFloor===null||Math.abs(initialFloor-p.y)>.27)return null;
 trial.y=initialFloor;
 for(let i=0;i<4;i++){
  resolveDynamicSeats(trial);setCapsule(trial);const hit=octree.capsuleIntersect(capsule);if(!hit)break;
  if(hit.depth>.45)return null;
  trial.addScaledVector(hit.normal,hit.depth+.001);
 }
 const y=supportAt(trial);if(y===null||Math.abs(y-p.y)>.27)return null;trial.y=y;
 setCapsule(trial);const left=octree.capsuleIntersect(capsule);if(left&&left.depth>.035)return null;
 return trial;
}
function placePlayer(name){
 const room=rooms[name]||rooms.living,requested=fromBlender(room.p);let position=resolvePosition(requested);
 if(!position){
  search:for(let r=.15;r<1.6;r+=.15)for(let i=0;i<12;i++){
   const p=requested.clone().add(new THREE.Vector3(Math.cos(i*Math.PI/6)*r,0,Math.sin(i*Math.PI/6)*r));
   position=resolvePosition(p);if(position)break search;
  }
 }
 if(!position)throw new Error(`Não há espaço livre para o personagem em ${name}`);
 player.position.copy(position);const target=fromBlender(room.t).sub(position);target.y=0;target.normalize();
 yaw=Math.atan2(-target.x,-target.z);pitch=0;player.rotation.y=Math.atan2(target.x,target.z);
 walkBlend=0;runBlend=0;jumpBlend=0;jumpController?.reset();velocity.set(0,0,0);eyeSpring.value=position.y+EYE_HEIGHT;eyeSpring.velocity=0;bodySpring.value=position.y;bodySpring.velocity=0;footPlacement?.reset();
 followDestination();introCamera.copy(desiredCamera);introTarget.copy(focus);
 if(name==='living'&&heroPath){heroPath.points.at(-1).copy(introCamera);heroTargets.points.at(-1).copy(introTarget);}
 ui.roomTitle.textContent=room.title;
}
function gotoRoom(name){
 if(!rooms[name]||!window.__ready)return;
 interactions?.reset();
 mode='free';resetFrameClock();dismissHandoff();placePlayer(name);camera.position.copy(desiredCamera);camera.lookAt(focus);
 heroCompleted=true;updateModeUI();window.scrollTo(0,0);document.querySelector('.navigation').open=false;
}
function movePlayer(delta){
 if(delta.lengthSq()<1e-10)return 0;
 const before=player.position.clone(),count=Math.max(1,Math.ceil(delta.length()/.065));delta.multiplyScalar(1/count);blockedLastMove=false;
 for(let i=0;i<count;i++){
  let resolved=resolvePosition(player.position.clone().add(delta));
  if(!resolved){
   // Slide along a wall, retaining the floor and capsule checks on each axis.
   resolved=resolvePosition(player.position.clone().add(new THREE.Vector3(delta.x,0,0)));
   if(resolved&&resolved.distanceToSquared(player.position)<1e-8)resolved=null;
   if(!resolved)resolved=resolvePosition(player.position.clone().add(new THREE.Vector3(0,0,delta.z)));
  }
  if(resolved)player.position.copy(resolved);else blockedLastMove=true;
 }
 const travelled=Math.hypot(player.position.x-before.x,player.position.z-before.z);
 if(travelled>.0001){
  const forward=player.position.clone().sub(before);const angle=Math.atan2(forward.x,forward.z);
  player.rotation.y+=Math.atan2(Math.sin(angle-player.rotation.y),Math.cos(angle-player.rotation.y))*(1-Math.exp(-12*Math.min(.05,lastMoveDt)));
 }
 return travelled;
}
let lastMoveDt=1/60;
function cameraObstruction(origin,direction){
 // While sitting in the car, an exterior third-person view must see through
 // the vehicle volume. The garage and the house still limit the camera.
 const carPose=interactions?.getPose().carSeat||0;
 let start=origin.clone(),advance=0;
 if(carPose>.08&&vehicleBounds?.containsPoint(start)){
  const exit=new THREE.Ray(start,direction).intersectBox(vehicleBounds,new THREE.Vector3());
  if(exit){advance=exit.distanceTo(start)+.025;start.addScaledVector(direction,advance);}
 }
 ray.set(start,direction);const hit=octree.rayIntersect(ray);
 return hit?{...hit,distance:hit.distance+advance}:null;
}
function followDestination(){
 if(cameraMode==='first'){
  desiredCamera.set(player.position.x,eyeSpring.value,player.position.z);
  if(interactions)desiredCamera.add(interactions.getFirstPersonOffset());
  lookRotation.setFromEuler(lookEuler.set(-pitch,yaw,0,'YXZ'));
  focus.set(0,0,-1).applyQuaternion(lookRotation).add(desiredCamera);return;
 }
 focus.copy(player.position).add(new THREE.Vector3(0,interactions?.getFocusHeight(1.20)??1.20,0));
 const interactionPose=interactions?.getPose()||{},carPose=interactionPose.carSeat||0,carView=interactionPose.kind==='car'&&carPose>.03&&interactionMetadata.car,seatedView=interactionPose.kind==='seat'&&((interactionPose.sit||0)+(interactionPose.lounger||0))>.03;
 // The driving view keeps the door and cabin in an exterior three-quarter
 // frame. Pointer yaw/pitch still orbit normally around that cabin focus.
 if(carView){const cabin=new THREE.Vector3(...(carView.driverSeat||carView.position));cabin.y=(carView.seatCushionY??cabin.y+.43)+.38;focus.lerp(cabin,Math.min(1,carPose/.4));}
 // A seated view faces the person from the open side of the furniture;
 // the backrest must not force the camera into the torso. The normal house
 // obstruction ray still keeps this orbit on the visitor's side of walls.
 const distance=carView?4.25:seatedView?2.45:touch?3.5:3.25,viewYaw=yaw-(carView?Math.PI*.75:seatedView?Math.PI-.55:0),viewPitch=carView?THREE.MathUtils.clamp(pitch+.30,-.25,1.05):seatedView?THREE.MathUtils.clamp(pitch+.22,-.35,1.05):pitch;
 const offset=new THREE.Vector3(Math.sin(viewYaw)*Math.cos(viewPitch),Math.sin(viewPitch),Math.cos(viewYaw)*Math.cos(viewPitch)).multiplyScalar(distance);
 const length=offset.length(),hit=cameraObstruction(focus,offset.clone().normalize());
 const permitted=hit?Math.max(.025,Math.min(length,hit.distance-.12)):length;
 desiredCamera.copy(focus).addScaledVector(offset,permitted/length);
}
function updateAvatar(dt,travelled){
 const speed=travelled/Math.max(dt,.001),moving=speed>.02;
 const pose=interactions?.getPose()||{},locked=interactions?.isMovementLocked()||false;
 const jumpPose=jumpController?.pose()||{weight:0,time:0,airborne:false};jumpBlend=THREE.MathUtils.damp(jumpBlend,jumpPose.weight,jumpPose.airborne?24:16,dt);
 const animationPose=Math.min(1,(pose.sit||0)+(pose.carSeat||0)+(pose.lounger||0)+(pose.swim||0)+(pose.treadWater||0)+(jumpAction?jumpBlend:0));
 const walking=(!locked||pose.approachWalk)&&moving&&!jumpPose.airborne;
 walkBlend=THREE.MathUtils.damp(walkBlend,walking?Math.min(1,speed/.6):0,12,dt);
 runBlend=THREE.MathUtils.damp(runBlend,walking&&keys.has('shift')&&!locked?1:0,10,dt);
 const locomotion=walkBlend*(1-animationPose),runWeight=runAction?locomotion*runBlend:0,walkWeight=locomotion-runWeight;
 idleAction?.setEffectiveWeight((1-walkBlend)*(1-animationPose));
 if(walkAction){walkAction.setEffectiveWeight(walkWeight);walkAction.setEffectiveTimeScale(walking?speed/1.284652:0);}
 // Run was authored at 2.8 m/s; retain that stride reference as movement speeds change.
 if(runAction){runAction.setEffectiveWeight(runWeight);runAction.setEffectiveTimeScale(walking?speed/2.8:0);}
 for(const [key,action]of Object.entries(interactionActions))action.setEffectiveWeight(pose[key]||0);
 if(jumpAction){jumpAction.setEffectiveWeight(jumpBlend);jumpAction.time=jumpPose.time*jumpAction.getClip().duration;}
 mixer?.update(dt);
 if(playerModel)playerModel.position.y=modelBaseY+bodySpring.value-player.position.y;
 if((!locked||pose.approachWalk)&&!jumpPose.airborne)footPlacement?.update(walkBlend,walking);else footPlacement?.reset();
 seatedFootPlacement?.update(pose.sit||0,pose.seatSupport);
}
async function buildCollision(root){
 startLoadStage('collisionCollect');
 const budget=createYieldBudget(8);
 const area=new THREE.Box3(new THREE.Vector3(-15,-2,-36),new THREE.Vector3(29,10,33));
 const bounds=new THREE.Box3(),a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
 root.updateMatrixWorld(true);
 root.traverse(node=>{if(node.name.startsWith('R30_SEAT_'))dynamicSeatColliders.push({node,origin:node.getWorldPosition(new THREE.Vector3()),box:new THREE.Box3().setFromObject(node)});});
 const meshes=[];root.traverse(mesh=>{
  if(!mesh.isMesh)return;
  for(let parent=mesh.parent;parent;parent=parent.parent)if(parent.name.startsWith('R30_SEAT_'))return;
  meshes.push(mesh);
 });
 for(const mesh of meshes){
  // Vehicle doors contribute their closed rest geometry. All authored entry
  // sequences lock free locomotion, so the static capsule remains valid again
  // before the visitor can walk and the door has closed.
  const geometry=mesh.geometry,position=geometry.attributes.position,index=geometry.index;
  const materials=Array.isArray(mesh.material)?mesh.material:[mesh.material];
  const groups=geometry.groups.length?geometry.groups:[{start:0,count:index?index.count:position.count,materialIndex:0}];
  for(const group of groups){
   const mat=materials[group.materialIndex]||materials[0];
   if(/Foliage|Leaf|Bark|Mountain|Soil|Water|Seam|LED|Book|Paper|Stem/i.test(mat.name))continue;
   for(let i=group.start;i<group.start+group.count;i+=3){
    if((i-group.start)%1536===0){const pending=budget.check();if(pending)await pending;}
    a.fromBufferAttribute(position,index?index.getX(i):i).applyMatrix4(mesh.matrixWorld);
    b.fromBufferAttribute(position,index?index.getX(i+1):i+1).applyMatrix4(mesh.matrixWorld);
    c.fromBufferAttribute(position,index?index.getX(i+2):i+2).applyMatrix4(mesh.matrixWorld);
    bounds.setFromPoints([a,b,c]);if(!bounds.intersectsBox(area))continue;
    const triangle=new THREE.Triangle(a.clone(),b.clone(),c.clone());if(triangle.getArea()<.00003)continue;
    octree.addTriangle(triangle);collisionTriangleCount++;
    // Thin glass has to block from both sides, including the terrace guards.
    if(/Glass|Mirror/i.test(mat.name)){octree.addTriangle(new THREE.Triangle(c.clone(),b.clone(),a.clone()));collisionTriangleCount++;}
   }
  }
 }
 loadPerformance.collisionCollection=budget.finish();endLoadStage('collisionCollect');
 startLoadStage('collisionTree');
 loadPerformance.collisionTree=await buildOctreeCooperatively(octree);
 endLoadStage('collisionTree');
}
ui.introMode.onclick=startIntro;ui.scrollMode.onclick=()=>setMode('scroll');ui.freeMode.onclick=()=>setMode('free');
document.querySelectorAll('[data-room]').forEach(b=>b.onclick=()=>gotoRoom(b.dataset.room));
document.querySelectorAll('[data-key]').forEach(button=>{
 button.onpointerdown=e=>{if(mode!=='free')return;e.preventDefault();dismissHandoff();button.setPointerCapture(e.pointerId);setMovementKey(button.dataset.key,true);};
 button.onpointerup=button.onpointercancel=button.onlostpointercapture=()=>setMovementKey(button.dataset.key,false);
});
window.addEventListener('keydown',e=>{
 if(mode==='free'&&!e.target.closest('input,textarea')&&e.code==='Space'){e.preventDefault();if(!e.repeat&&!interactions?.isMovementLocked()&&jumpController?.request()){dismissHandoff();footPlacement?.reset();}return;}
 if(mode==='free'&&!e.target.closest('input,textarea')&&interactions?.handleKey(e)){dismissHandoff();resetFrameClock();return;}
 if(embedding.enabled&&mode==='free'&&e.key==='Escape'&&!e.repeat){e.preventDefault();embedding.exit();return;}
 if(e.key.toLowerCase()==='v'&&mode==='free'&&!e.repeat){setViewMode(cameraMode==='first'?'third':'first');e.preventDefault();return;}
 const key=e.key.toLowerCase();if(mode==='free'&&!e.target.closest('input,textarea')&&['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','shift'].includes(key)){setMovementKey(key,true);dismissHandoff();e.preventDefault();}
});
window.addEventListener('keyup',e=>setMovementKey(e.key.toLowerCase(),false));
const jumpButton=document.getElementById('jumpAction');
jumpButton.onpointerdown=e=>{if(mode!=='free')return;e.preventDefault();if(!interactions?.isMovementLocked()&&jumpController?.request()){dismissHandoff();footPlacement?.reset();}};
function setMovementKey(key,pressed){
 if(keys.has(key)===pressed)return;
 if(pressed)keys.add(key);else keys.delete(key);
 inputChanges.push({time:performance.now(),key,pressed});
}
function resetFrameClock(){last=performance.now();keys.clear();physicsKeys.clear();inputChanges.length=0;velocity.set(0,0,0);pointer=null;wheelStep=0;}
window.addEventListener('blur',resetFrameClock);
document.addEventListener('visibilitychange',resetFrameClock);
renderer.domElement.onpointerdown=e=>{if(mode!=='free')return;dismissHandoff();pointer={id:e.pointerId,x:e.clientX,y:e.clientY};renderer.domElement.setPointerCapture(e.pointerId);};
renderer.domElement.onpointermove=e=>{
 if(!pointer||pointer.id!==e.pointerId||mode!=='free')return;
 yaw-=(e.clientX-pointer.x)*.004;pitch=THREE.MathUtils.clamp(pitch+(e.clientY-pointer.y)*.003,-1.15,1.25);
 pointer.x=e.clientX;pointer.y=e.clientY;
};
renderer.domElement.onpointerup=renderer.domElement.onpointercancel=renderer.domElement.onlostpointercapture=()=>{pointer=null;};
// Wheel/touch page scrolling stays with the host page after the handoff.
// Locomotion has explicit keyboard/touch controls and does not consume scroll.
renderer.domElement.addEventListener('wheel',()=>{if(mode==='free')dismissHandoff();},{passive:true});
ui.interactionAction.onclick=()=>{if(!jumpController?.airborne&&!jumpController?.queued&&interactions?.activate()){resetFrameClock();dismissHandoff();}};
function sample(t){
 const keys=route.keyframes,seconds=t*HERO_SECONDS;
 let i=keys.findIndex((p,j)=>j<keys.length-1&&seconds<=keys[j+1].t);if(i<0)i=keys.length-2;
 const u=THREE.MathUtils.clamp((seconds-keys[i].t)/(keys[i+1].t-keys[i].t),0,1);
 const dt=keys[i+1].t-keys[i].t;
 const interpolate=points=>{
  const tangent=j=>j===0||j===points.length-1?new THREE.Vector3():points[j+1].clone().sub(points[j-1]).multiplyScalar(.82/(keys[j+1].t-keys[j-1].t));
  const u2=u*u,u3=u2*u;
  return points[i].clone().multiplyScalar(2*u3-3*u2+1).addScaledVector(tangent(i),(u3-2*u2+u)*dt).addScaledVector(points[i+1],-2*u3+3*u2).addScaledVector(tangent(i+1),(u3-u2)*dt);
 };
 camera.position.copy(interpolate(heroPath.points));camera.lookAt(interpolate(heroTargets.points));
 const fov=THREE.MathUtils.lerp(keys[i].fov||53,keys[i+1].fov||53,u);
 if(camera.fov!==fov){camera.fov=fov;camera.updateProjectionMatrix();}
}
function updateProgress(){ui.progress.style.width=`${progress*100}%`;ui.roomTitle.textContent=progress<.7?'Sobrevoando a casa':progress<.88?'Chegando à varanda':'Encontre seu lugar';}
function frameElapsed(now){
 const elapsed=Math.max(0,(now-last)/1000);last=now;
 // Visible GPU stalls still consume their real time. Treat a suspended or
 // unresponsive page (>5 seconds without a frame) as a pause, releasing input
 // instead of walking the visitor across the house on the next frame.
 if(elapsed>5){resetFrameClock();return 0;}
 return elapsed;
}
function* movementSteps(start,end){
 let cursor=start;
 while(cursor<end){
  while(inputChanges.length&&inputChanges[0].time<=cursor){
   const change=inputChanges.shift();if(change.pressed)physicsKeys.add(change.key);else physicsKeys.delete(change.key);
  }
  const next=Math.min(end,cursor+50,inputChanges[0]?.time??Infinity);
  // Split at actual key changes as well as 50ms. A new W/Shift press must not
  // affect the time before that event, even when a graphics frame was slow.
  yield{dt:(next-cursor)/1000,keys:physicsKeys};cursor=next;
 }
}
function tick(now){
 requestAnimationFrame(tick);const elapsed=frameElapsed(now),dt=elapsed;
 if(!window.__visualReady||preparingGraphics||document.hidden||(embedding.enabled&&!embedding.state.active))return;
 movedLastFrame=0;
 if(mode==='intro'){introElapsed+=elapsed;progress=Math.min(1,introElapsed/HERO_SECONDS);sample(progress);updateProgress();if(progress>=1)finishIntro();}
 else if(mode==='scroll'){progress=THREE.MathUtils.clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight),0,1);sample(progress);updateProgress();if(progress>=.999)finishIntro();}
 else if(mode==='free'){
  const forward=new THREE.Vector3(-Math.sin(yaw),0,-Math.cos(yaw)),right=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw)),delta=new THREE.Vector3();
  // Consume the active frame in bounded steps, split further at key changes.
  // Capsule movement still checks every 6.5cm during slow graphics frames.
  for(const step of movementSteps(now-dt*1000,now)){
   const stepDt=step.dt,stepKeys=step.keys;
   const input={forward:Number(stepKeys.has('w')||stepKeys.has('arrowup'))-Number(stepKeys.has('s')||stepKeys.has('arrowdown')),strafe:Number(stepKeys.has('d')||stepKeys.has('arrowright'))-Number(stepKeys.has('a')||stepKeys.has('arrowleft')),yaw};
   const beforeInteraction=player.position.clone();interactions?.update(stepDt,input);
   if(interactions?.isMovementLocked()){
    velocity.set(0,0,0);movedLastFrame+=Math.hypot(player.position.x-beforeInteraction.x,player.position.z-beforeInteraction.z);
   }else{
    delta.set(0,0,0).addScaledVector(forward,input.forward).addScaledVector(right,input.strafe);
    if(delta.lengthSq()>0)delta.normalize().multiplyScalar(stepKeys.has('shift')?RUN_SPEED:WALK_SPEED);
    velocity.lerp(delta,1-Math.exp(-(delta.lengthSq()?9:15)*stepDt));
    if(velocity.lengthSq()<.00001)velocity.set(0,0,0);
    delta.copy(velocity).multiplyScalar(stepDt);lastMoveDt=stepDt;
    const airborneMove=jumpController?.update(stepDt,delta);movedLastFrame+=airborneMove===null||airborneMove===undefined?movePlayer(delta):airborneMove;
    if(jumpController?.airborne&&interactions?.enterWaterFromMotion()){jumpController.reset();jumpBlend=0;velocity.set(0,0,0);footPlacement?.reset();sun.shadow.needsUpdate=true;}
   }
   spring(eyeSpring,player.position.y+(interactions?.getEyeHeight(EYE_HEIGHT)??EYE_HEIGHT),16,stepDt);
   spring(bodySpring,player.position.y,22,stepDt);
  }
  followDestination();
  if(cameraMode==='first'){
   if(viewTransition>0){camera.position.lerp(desiredCamera,1-Math.exp(-18*dt));camera.quaternion.slerp(lookRotation,1-Math.exp(-18*dt));viewTransition-=dt;}
   else{camera.position.copy(desiredCamera);camera.quaternion.copy(lookRotation);}
   playerModel.visible=false;
  }else{
   const factor=1-Math.exp(-15*dt);camera.position.lerp(desiredCamera,factor);
   if(camera.position.distanceToSquared(desiredCamera)<1e-8)camera.position.copy(desiredCamera);
   const sight=camera.position.clone().sub(focus),obstruction=cameraObstruction(focus,sight.clone().normalize());
   if(obstruction&&obstruction.distance<sight.length()+.06)camera.position.copy(focus).addScaledVector(sight.normalize(),Math.max(.025,obstruction.distance-.10));
   playerModel.visible=camera.position.distanceTo(focus)>.6;camera.lookAt(focus);
  }
 }
 if(mode!=='free')interactions?.update(dt);
 if(mode==='free'&&((cameraMode==='third'&&movedLastFrame>.001)||interactions?.getState().transition)&&now-lastShadowUpdate>90){sun.shadow.needsUpdate=true;lastShadowUpdate=now;}
 if(playerModel&&mode!=='free')playerModel.visible=camera.position.distanceTo(player.position.clone().add(new THREE.Vector3(0,EYE_HEIGHT,0)))>.65;
 updateAvatar(dt,movedLastFrame);renderer.info.autoReset=false;renderer.info.reset();
 // Contact shading returns once the view rests; moving navigation avoids
 // rendering the entire environment again for the screen-space AO pass.
 if(movedLastFrame>.001||pointer||interactions?.getState().transition)lastVisualMotion=now;
 contactAO.enabled=mode==='free'&&now-lastVisualMotion>250;
 if(mode==='free')composer.render();else renderer.render(scene,camera);
}
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);sizeComposer();});
window.__hero={scene,camera,renderer,player,bones,octree,rooms,gotoRoom,setMode,startIntro,resolvePosition,setViewMode,
 embedding,
 get visualReady(){return !!window.__visualReady;},get playerReady(){return playerReady;},ensurePlayerReady,
 get interactions(){return interactions;},get interactionMetadata(){return interactionMetadata;},get jump(){return jumpController;},get seatedFeet(){return seatedFootPlacement;},
 sampleHero:sample,heroDuration:HERO_SECONDS,
 get mode(){return mode;},get heroCompleted(){return heroCompleted;},get progress(){return progress;},get introElapsed(){return introElapsed;},get walkBlend(){return walkBlend;},get idleTime(){return idleAction?.time||0;},
 setProgress(p){setMode('scroll');window.scrollTo(0,p*(document.documentElement.scrollHeight-innerHeight));},
 metrics(){return{triangles:renderer.info.render.triangles,calls:renderer.info.render.calls,textures:renderer.info.memory.textures,position:camera.position.toArray(),player:player.position.toArray(),collisionTriangles:collisionTriangleCount,walkBlend,runBlend,jumpBlend,jump:jumpController?.metrics(),speed:velocity.length(),walkSpeed:WALK_SPEED,runSpeed:RUN_SPEED,cameraMode,eyeHeight:interactions?.getEyeHeight(EYE_HEIGHT)??EYE_HEIGHT,eyeY:eyeSpring.value,blockedLastMove,interaction:interactions?.getState().state||'idle',animations:mixer?._actions.map(a=>a.getClip().name)||[],assetAnimations:[...playerClipNames]};}
};
requestAnimationFrame(tick);
const draco=new DRACOLoader();draco.setDecoderPath('./node_modules/three/examples/jsm/libs/draco/gltf/');const loader=new GLTFLoader();loader.setDRACOLoader(draco);loader.setMeshoptDecoder(MeshoptDecoder);
const setLoad=(phase,percent,label)=>{
 const value=Math.max(0,Math.min(100,Math.round(Number(percent)||0)));
 if(label)ui.loadText.textContent=`${label} ${value}%`;
 embedding.reportLoad?.(phase,value,label||'');
};
function reportLoadingFailure(error){ui.loadText.textContent=embedding.enabled?'Não foi possível carregar o ambiente. Recarregue esta página para tentar novamente.':'Não foi possível preparar a visita. Abra pelo INICIAR_HERO e recarregue.';window.__loadError=String(error);embedding.reportError?.(error);console.error(error);}
async function ensurePlayerReady(){
 if(playerReady)return true;
 if(playerLoadPromise)return playerLoadPromise;
 playerLoadPromise=(async()=>{
  setLoad('player',0,'Preparando personagem…');
  startLoadStage('playerPayload');
  const avatar=await loader.loadAsync(versionedAssetURL('./PLAYER.glb'),e=>{if(e.total)setLoad('player',Math.min(1,e.loaded/Math.max(e.loaded,e.total))*90,'Preparando personagem…');});
  endLoadStage('playerPayload');
  setLoad('player',92,'Preparando navegação…');
  // Reuse the exact collider already preparing behind the earlier case/orbit.
  collisionTaskController?.setPriority('user-visible');
  if(!collisionLoadPromise)collisionLoadPromise=buildCollision(environmentRoot);
  await collisionLoadPromise;
  setLoad('player',94,'Configurando personagem…');startLoadStage('playerSetup');
 playerClipNames=avatar.animations.map(clip=>clip.name);playerModel=avatar.scene;modelBaseY=playerModel.position.y;player.add(playerModel);playerModel.traverse(o=>{
  if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}
  // Rest-pose bounds do not cover the cap/body while swimming or sitting.
  // Whole-avatar visibility still controls the first-person presentation.
  if(o.isSkinnedMesh)o.frustumCulled=false;
  if(o.isBone)bones[o.name.replace(/^mixamorig[:_]?/i,'')]=o;
 });
 if(!avatar.animations.length)throw new Error('O personagem não contém a animação Idle');
 mixer=new THREE.AnimationMixer(playerModel);idleAction=mixer.clipAction(avatar.animations.find(a=>/^idle$/i.test(a.name))||avatar.animations[0]);idleAction.play();
 const walkClip=avatar.animations.find(a=>a.name==='WalkRefined')||avatar.animations.find(a=>a.name==='Walk');if(!walkClip)throw new Error('Animação Walk não encontrada');
 walkAction=mixer.clipAction(walkClip);walkAction.play().setEffectiveWeight(0);mixer.update(0);
 const runClip=avatar.animations.find(a=>a.name==='Run');if(runClip)runAction=mixer.clipAction(runClip).play().setEffectiveWeight(0);
 const jumpClip=avatar.animations.find(a=>a.name==='Jump');if(jumpClip){jumpAction=mixer.clipAction(jumpClip).play().setEffectiveWeight(0);jumpAction.paused=true;}
 for(const [key,name]of Object.entries({sit:'Sit',carSeat:'CarSeat',lounger:'Lounger',swim:'Swim',treadWater:'TreadWater'})){
  const clip=avatar.animations.find(a=>a.name===name);if(!clip)throw new Error(`Animação de interação ${name} não encontrada`);interactionActions[key]=mixer.clipAction(clip).play().setEffectiveWeight(0);
 }
 jumpController=createJumpController({player,octree,supportAt,resolvePosition,resolveDynamic:resolveDynamicSeats,radius:RADIUS,height:HEIGHT,onLand:()=>{footPlacement?.reset();sun.shadow.needsUpdate=true;},onRecover:()=>{velocity.set(0,0,0);footPlacement?.reset();}});
 interactions=createEnvironmentInteractions({scene,player,camera,renderer,metadata:interactionMetadata,resolvePosition,getViewMode:()=>cameraMode,getYaw:()=>yaw,setYaw:value=>{yaw=value;},getIsExploring:()=>mode==='free'&&!jumpController.airborne&&!jumpController.queued,
  onPrompt:prompt=>{ui.interactionHint.hidden=!prompt.visible;ui.interactionText.textContent=prompt.text;ui.interactionAction.textContent=prompt.action||'Interagir';ui.interactionAction.hidden=prompt.busy||!prompt.visible;ui.interactionAction.disabled=!!prompt.busy;ui.interactionHint.setAttribute('aria-busy',String(!!prompt.busy));if(prompt.visible)dismissHandoff();},
  onStateChange:()=>{sun.shadow.needsUpdate=true;},
  onTransitionEnd:()=>{velocity.set(0,0,0);footPlacement?.reset();eyeSpring.velocity=0;bodySpring.velocity=0;}
 });
 if(interactions.water)transparentMeshes.push(interactions.water.mesh,...interactions.water.root.children.filter(o=>o.isMesh&&o.material.transparent));
 footPlacement=createFootPlacement(player,playerModel,bones,octree);seatedFootPlacement=createSeatedFootPlacement(player,playerModel,bones,octree);setViewMode('first');viewTransition=0;setLoad('player',97,'Preparando animações…');
 endLoadStage('playerSetup');
 // Prepare the exploration passes while the loading screen still owns the
 // scene, so its first shadow/AO shader compilation cannot swallow key input.
 setLoad('player',98,'Preparando iluminação…');
 startLoadStage('playerWarmup');await yieldMainThread();
 await prepareTextures(playerModel,'playerTextureUpload');
 placePlayer('living');sample(progress);scene.updateMatrixWorld(true);
 const warmupExploration=()=>{const previousAO=contactAO.enabled;contactAO.enabled=true;try{composer.render();}finally{contactAO.enabled=previousAO;}};
 await renderer.compileAsync(scene,camera);await yieldMainThread();warmupExploration();
 await yieldMainThread();playerModel.visible=false;sun.shadow.needsUpdate=true;warmupExploration();
 endLoadStage('playerWarmup');loadPerformance.playerReadyMs=performance.now()-loadPerformance.startedAt;
 setTimeout(()=>longTaskObserver?.disconnect(),100);
  playerReady=true;window.__ready=true;setLoad('player',100,'Personagem pronto ·');
  embedding.ready();return true;
 })().catch(error=>{playerLoadPromise=null;embedding.reportLoad?.('player',0,'Falha ao preparar personagem');throw error;});
 return playerLoadPromise;
}
try{
 setLoad('environment',0,'Carregando ambiente…');
 const [response,metadataResponse]=await Promise.all([fetch(versionedAssetURL('./hero-route.json')),fetch(versionedAssetURL('./interaction-metadata.json'))]);
 if(!response.ok)throw new Error('Percurso indisponível');if(!metadataResponse.ok)throw new Error('Interações indisponíveis');route=await response.json();interactionMetadata=await metadataResponse.json();
 heroPath=new THREE.CatmullRomCurve3(route.keyframes.map(k=>new THREE.Vector3(...k.position)),false,'centripetal');
 heroTargets=new THREE.CatmullRomCurve3(route.keyframes.map(k=>new THREE.Vector3(...k.target)),false,'centripetal');
 startLoadStage('environmentPayload');
 const house=await loadHouseAsset(loader,{url:'./CASA_HERO.glb',onProgress:e=>{if(e.total)setLoad('environment',Math.min(1,e.loaded/Math.max(e.loaded,e.total))*82,'Carregando ambiente…');}});
 endLoadStage('environmentPayload');
 setLoad('environment',84,'Montando ambiente…');
 const embeddedVehicle=house.scene.getObjectByName('CASA_VEHICLE');
 if(!embeddedVehicle)throw new Error('CASA_HERO.glb está incompleto: o carro articulado CASA_VEHICLE deve estar incluído no ambiente.');
 startLoadStage('partition');const spatialPartition=await partitionStaticScene(house.scene);window.__scenePartition=spatialPartition;endLoadStage('partition');
 environmentRoot=new THREE.Group();environmentRoot.name='CASA_Environment';environmentRoot.add(house.scene);scene.add(environmentRoot);vehicleBounds=new THREE.Box3().setFromObject(embeddedVehicle).expandByScalar(.08);
 environmentRoot.traverse(o=>{
  if(o.isLight)o.visible=false;if(!o.isMesh)return;const materials=Array.isArray(o.material)?o.material:[o.material];
  o.castShadow=!materials.every(m=>m.transmission>0);o.receiveShadow=true;
  for(const m of materials)for(const texture of [m.map,m.normalMap,m.roughnessMap,m.metalnessMap])if(texture)texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  if(materials.some(m=>m.transmission>0||m.transparent))transparentMeshes.push(o);
 });
 setLoad('environment',94,'Preparando iluminação…');
 startLoadStage('environmentWarmup');await yieldMainThread();
 await prepareTextures(environmentRoot,'environmentTextureUpload');
 sample(0);scene.updateMatrixWorld(true);startLoadStage('environmentShaderCompile');await renderer.compileAsync(scene,camera);endLoadStage('environmentShaderCompile');
 await prepareDraws(environmentRoot,'environmentDrawUpload');
 startLoadStage('environmentFirstRender');renderer.render(scene,camera);endLoadStage('environmentFirstRender');
 endLoadStage('environmentWarmup');loadPerformance.visualReadyMs=performance.now()-loadPerformance.startedAt;
 window.__visualReady=true;mode='embedded';document.body.dataset.mode='embedded';
 setLoad('environment',100,'Ambiente pronto ·');
 if(embedding.enabled){
  embedding.visualReady();ui.loading.classList.add('done');
  if(!collisionLoadPromise){
   collisionTaskController=globalThis.TaskController?new TaskController({priority:'background'}):null;
   collisionLoadPromise=globalThis.scheduler?.postTask?globalThis.scheduler.postTask(()=>buildCollision(environmentRoot),collisionTaskController?{signal:collisionTaskController.signal}:{priority:'user-visible'}):new Promise(resolve=>setTimeout(resolve,0)).then(()=>buildCollision(environmentRoot));
   collisionLoadPromise.catch(reportLoadingFailure);
  }
 }
 else{await ensurePlayerReady();startIntro();renderer.render(scene,camera);ui.loading.classList.add('done');}
}catch(error){reportLoadingFailure(error);}
