import * as THREE from 'three';

// Coordinates in interactions.json are already glTF / Three.js coordinates:
// X right, Y up, Z horizontal. Walking outside these authored interactions
// remains the responsibility of the existing capsule and stair controller.
const TAU=Math.PI*2;
const ease=t=>t*t*(3-2*t);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const angleLerp=(a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;
const vec=value=>value?.isVector3?value.clone():new THREE.Vector3(...(value||[0,0,0]));
const distanceXZ=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);

function waterNormalTexture(){
 const size=128,data=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=x/size*TAU,v=y/size*TAU;
  const dx=.14*Math.cos(u*3+v*2)+.055*Math.cos(u*7-v*5);
  const dy=.10*Math.cos(u*3+v*2)-.075*Math.cos(u*7-v*5)+.035*Math.sin(v*9);
  const n=new THREE.Vector3(-dx,-dy,1).normalize(),i=(y*size+x)*4;
  data[i]=Math.round((n.x*.5+.5)*255);data[i+1]=Math.round((n.y*.5+.5)*255);data[i+2]=Math.round((n.z*.5+.5)*255);data[i+3]=255;
 }
 const texture=new THREE.DataTexture(data,size,size,THREE.RGBAFormat);
 texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
 texture.magFilter=THREE.LinearFilter;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.generateMipmaps=true;texture.needsUpdate=true;
 return texture;
}

function waterCausticTexture(){
 const size=128,data=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=x/size*TAU,v=y/size*TAU;
  const a=Math.abs(Math.sin(u*3+.72*Math.sin(v*2)));
  const b=Math.abs(Math.sin(v*3+.56*Math.cos(u*2)));
  const value=clamp(Math.pow(1-Math.min(a,b),10)*.9,0,1),i=(y*size+x)*4;
  data[i]=164;data[i+1]=232;data[i+2]=220;data[i+3]=Math.round(value*105);
 }
 const texture=new THREE.DataTexture(data,size,size,THREE.RGBAFormat);
 texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
 texture.magFilter=THREE.LinearFilter;texture.minFilter=THREE.LinearFilter;texture.needsUpdate=true;
 return texture;
}

function createPoolWater(scene,definition){
 if(!definition?.bounds)return null;
 const [lo,hi]=definition.bounds.map(vec),width=hi.x-lo.x,length=hi.z-lo.z;
 const surface=definition.surfaceY??hi.y,depth=definition.depth??Math.max(.6,hi.y-lo.y),border=definition.borderInset??.055;
 if(!(width>.3&&length>.3&&depth>.2))throw new Error('Dimensões da piscina inválidas.');
 const root=new THREE.Group();root.name='INTERACTION_PoolWater';scene.add(root);
 const hidden=[];
 for(const name of definition.sourceNodes||['POOL_Water_PLAN']){
  const node=scene.getObjectByName(name);
  if(node){hidden.push({node,visible:node.visible});node.visible=false;}
 }
 // Static export joins meshes by material, so the water fallback may lose
 // its object name. Keep it visible in standalone GLB viewers, and replace
 // it once with the animated surface when this runtime is loaded.
 scene.traverse(node=>{
  if(!node.isMesh||hidden.some(row=>row.node===node))return;
  const materials=Array.isArray(node.material)?node.material:[node.material];
  if(materials.length&&materials.every(material=>material.name==='MAT_Water_Pool')){
   hidden.push({node,visible:node.visible});node.visible=false;
  }
 });
 const normal=waterNormalTexture();normal.repeat.set(width/1.35,length/1.35);
 const material=new THREE.MeshPhysicalMaterial({name:'INTERACTION_Water_Visible',color:0x379991,roughness:.14,metalness:0,transmission:.47,thickness:Math.min(1.65,depth),ior:1.333,attenuationColor:0x258f86,attenuationDistance:3.7,clearcoat:1,clearcoatRoughness:.07,normalMap:normal,normalScale:new THREE.Vector2(.40,.40),envMapIntensity:1.35,side:THREE.DoubleSide});
 const columns=clamp(Math.ceil(width/.22),12,40),rows=clamp(Math.ceil(length/.32),24,160);
 const geometry=new THREE.PlaneGeometry(width-border*2,length-border*2,columns,rows);geometry.rotateX(-Math.PI/2);
 const base=geometry.attributes.position.array.slice();
 const mesh=new THREE.Mesh(geometry,material);mesh.name='INTERACTION_PoolSurface';mesh.position.set((lo.x+hi.x)/2,surface+.003,(lo.z+hi.z)/2);mesh.receiveShadow=true;mesh.renderOrder=2;root.add(mesh);
 const causticTexture=waterCausticTexture();causticTexture.repeat.set(width/1.7,length/1.7);
 const causticMaterial=new THREE.MeshBasicMaterial({name:'INTERACTION_Caustics',map:causticTexture,transparent:true,opacity:.38,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});
 const caustics=new THREE.Mesh(new THREE.PlaneGeometry(width-.18,length-.18).rotateX(-Math.PI/2),causticMaterial);
 caustics.name='INTERACTION_PoolCaustics';caustics.position.set(mesh.position.x,surface-depth+.027,mesh.position.z);root.add(caustics);
 const ripples=Array.from({length:6},()=>({position:new THREE.Vector3(),age:10,strength:0}));
 let rippleCursor=0;
 function ripple(position,strength=1){const r=ripples[rippleCursor++%ripples.length];r.age=0;r.strength=strength;r.position.copy(position);}
 function update(dt,time){
  normal.offset.set(time*.008,-time*.005);causticTexture.offset.set(-time*.006,time*.003);
  for(const ripple of ripples)ripple.age+=dt;
  const p=geometry.attributes.position;
  for(let i=0;i<p.count;i++){
   const x=base[i*3],z=base[i*3+2];
   let displacement=.006*Math.sin(x*2.4+z*.76+time*.9)+.003*Math.sin(x*.63-z*1.85+time*1.25);
   for(const ripple of ripples){if(ripple.age>2.8)continue;const distance=Math.hypot(x+mesh.position.x-ripple.position.x,z+mesh.position.z-ripple.position.z),front=distance-ripple.age*.85;displacement+=.010*ripple.strength*Math.exp(-ripple.age*1.4)*Math.exp(-Math.abs(front)*3.5)*Math.sin(front*10);}
   p.array[i*3+1]=displacement;
  }
  p.needsUpdate=true;
  // The tangent-space normal scan supplies the fine ripples; the large wave
  // mesh normal only needs an update at a bounded 12 Hz cadence.
  if(Math.floor(time*12)!==Math.floor((time-dt)*12))geometry.computeVertexNormals();
 }
 function dispose(){for(const value of hidden)value.node.visible=value.visible;root.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});normal.dispose();causticTexture.dispose();root.removeFromParent();}
 return{root,mesh,material,normal,caustics,lo,hi,surface,depth,update,ripple,dispose};
}

/**
 * Authored interactions use short, smooth movement sequences. They never
 * replace resolvePosition or the accepted walking/stair animation.
 * Call update before walking. Only when isMovementLocked() is false should
 * the existing controller move the player. Blend getPose() clips after mixer.
 */
export function createEnvironmentInteractions(options){
 const {scene,player,metadata={},resolvePosition,getViewMode=()=> 'first',getYaw=()=>0,setYaw=()=>{},getIsExploring=()=>true,onPrompt=()=>{},onStateChange=()=>{},onTransitionEnd=()=>{}}=options;
 if(!scene||!player)throw new Error('Interações precisam da cena e do personagem.');
 const seatDefinitions=(metadata.seats||[]).filter(s=>s.enabled!==false).map(s=>{
  const node=s.dynamicNode?scene.getObjectByName(s.dynamicNode):null;
  if(s.dynamicNode&&!node)throw new Error('Grupo articulado do assento indisponível: '+s.dynamicNode);
  return{...s,id:s.id||s.node,position:vec(s.position),approach:vec(s.approach),yaw:s.yaw??0,dynamic:node?{node,base:node.position.clone(),offset:vec(s.pullOffset),amount:0}:null};
 });
 const carDefinition=metadata.car?.enabled===false?null:metadata.car;
 const car=carDefinition?{...carDefinition,id:carDefinition.id||'countach',position:vec(carDefinition.driverSeat||carDefinition.position),approach:vec(carDefinition.approach),doors:carDefinition.doors||carDefinition.doorNodes||[],yaw:carDefinition.yaw??Math.PI/2}:null;
 const poolDefinition=metadata.pool?.enabled===false?null:metadata.pool;
 const pool=poolDefinition?{...poolDefinition,id:poolDefinition.id||'pool',approach:vec(poolDefinition.approach||poolDefinition.entry),entry:vec(poolDefinition.entry),swimAnchor:vec(poolDefinition.swimAnchor||poolDefinition.entry),yaw:poolDefinition.yaw??0}:null;
 const water=createPoolWater(scene,poolDefinition);
 if(pool&&water){pool.swimAnchor.y=water.surface;pool.surfaceY=water.surface;}
 const doors=(car?.doors||[]).map(d=>{
  const node=scene.getObjectByName(d.node);if(!node)return null;
  return{node,base:node.quaternion.clone(),axis:vec(d.axis||[0,0,1]).normalize(),angle:d.angle??1.12};
 }).filter(Boolean);
 if(car&&(car.doors.length===0||doors.length!==car.doors.length))throw new Error('A porta articulada do Countach está indisponível.');
 let state='idle',active=null,sequence=null,stepIndex=0,stepElapsed=0,time=0,doorAmount=0,lastPrompt='',pendingCancel=false,disposed=false;
 let pose={sit:0,carSeat:0,lounger:0,swim:0,treadWater:0,waterMotion:0,time:0,kind:'none'},targetPose={...pose};
 let lastWaterRipple=0,swimVelocity=new THREE.Vector3(),saved=null;
 const events=[];
 function event(type,extra={}){events.push({type,time,...extra});if(events.length>120)events.shift();}
 function setState(next){state=next;event('state',{state,id:active?.id||null});onStateChange({state,id:active?.id||null,movementLocked:isMovementLocked()});}
 function isMovementLocked(){return state!=='idle';}
 function showPrompt(value){
  const payload={visible:false,text:'',action:'',key:'E',busy:false,...value};const identity=JSON.stringify(payload);
  if(identity!==lastPrompt){lastPrompt=identity;onPrompt(payload);}
 }
 function emitPrompt(){
  if(!getIsExploring()){showPrompt({});return;}
  if(sequence){showPrompt({visible:true,text:state==='poolExit'?'Voltando pela escada da piscina…':state==='poolEnter'?'Entrando na piscina…':state==='carEnter'?'Entrando no Countach…':state==='carExit'?'Saindo do Countach…':state==='seatExit'?'Levantando…':'Acomodando…',busy:true,key:''});return;}
  if(state==='seated'){showPrompt({visible:true,text:'E · levantar',action:'Levantar'});return;}
  if(state==='carSeated'){showPrompt({visible:true,text:'E · sair do carro',action:'Sair do carro'});return;}
  if(state==='swimming'){showPrompt({visible:true,text:'W/A/S/D · nadar  ·  E · sair pela escada',action:'Sair pela escada'});return;}
  const nearest=nearestInteraction();
  if(!nearest){showPrompt({});return;}
  showPrompt({visible:true,text:nearest.kind==='pool'?'E · entrar na piscina':nearest.kind==='car'?'E · entrar no Countach':'E · sentar',action:nearest.kind==='pool'?'Entrar na piscina':nearest.kind==='car'?'Entrar no carro':'Sentar',id:nearest.item.id});
 }
 function nearestInteraction(){
  const items=[...seatDefinitions.map(item=>({kind:'seat',item})),...(car?[{kind:'car',item:car}]:[]),...(pool&&water?[{kind:'pool',item:pool}]:[])];
  return items.map(value=>({...value,distance:distanceXZ(player.position,value.item.approach)})).filter(value=>value.distance<=(value.item.triggerRadius??value.item.radius??1.0)&&Math.abs(player.position.y-value.item.approach.y)<.45).sort((a,b)=>a.distance-b.distance)[0]||null;
 }
 function save(){saved={position:player.position.clone(),yaw:getYaw(),playerYaw:player.rotation.y,viewMode:getViewMode()};}
 function setPoseTarget(value){targetPose={sit:0,carSeat:0,lounger:0,swim:0,treadWater:0,waterMotion:0,time,kind:'none',...value};}
 function door(value){doorAmount=clamp(value,0,1);for(const d of doors)d.node.quaternion.copy(d.base).multiply(new THREE.Quaternion().setFromAxisAngle(d.axis,d.angle*doorAmount));}
 function chair(value){
  const dynamic=active?.dynamic;if(!dynamic)return;dynamic.amount=clamp(value,0,1);
  const parent=dynamic.node.parent,parentPosition=parent?.getWorldPosition(new THREE.Vector3())||new THREE.Vector3();
  const local=parent?parent.worldToLocal(parentPosition.clone().add(dynamic.offset)).sub(parent.worldToLocal(parentPosition.clone())):dynamic.offset;
  dynamic.node.position.copy(dynamic.base).addScaledVector(local,dynamic.amount);dynamic.node.updateMatrixWorld(true);
 }
 function moveStep(to,duration,{walk=false,supportAtEnd=false,yaw=null,pose:stepPose=null,door:doorTarget=null,carPoseRange=null,chair:chairTarget=null}={}){return{to:vec(to),duration:Math.max(.05,duration),walk,supportAtEnd,yaw,pose:stepPose,door:doorTarget,carPoseRange,chair:chairTarget};}
 function begin(next,steps,complete){sequence={steps,complete};stepIndex=0;stepElapsed=0;setState(next);startStep();}
 function startStep(){
  const step=sequence.steps[stepIndex];step.start=player.position.clone();step.startYaw=player.rotation.y;step.viewYaw=getYaw();step.startDoor=doorAmount;step.startCarPose=pose.carSeat;step.startChair=active?.dynamic?.amount||0;
  if(step.to===null)step.to=step.start.clone();if(step.pose)setPoseTarget(step.pose);
 }
 function safeWalkTarget(position){return resolvePosition?resolvePosition(position.clone()):position;}
 function approachSteps(item){
  const path=item.approachPath||[item.approach.toArray()],steps=[];
  let previous=player.position.clone();
  for(const point of path){const to=vec(point),distance=distanceXZ(previous,to),duration=Math.max(.22,distance/(item.approachSpeed??1.12)),direction=distance>.02?Math.atan2(to.x-previous.x,to.z-previous.z):item.yaw;steps.push(moveStep(to,duration,{walk:true,yaw:direction}));previous=to;}
  return steps;
 }
 function standingComplete(){
  swimVelocity.set(0,0,0);const destination=active?.approach;
  const supported=destination?safeWalkTarget(destination):safeWalkTarget(player.position);
  if(supported)player.position.copy(supported);
  setPoseTarget({});door(0);setState('idle');active=null;saved=null;pendingCancel=false;onTransitionEnd({position:player.position.clone(),yaw:getYaw()});emitPrompt();
 }
 function failWalk(){
  const failure={state,id:active?.id,position:player.position.toArray(),stepIndex,target:sequence?.steps[stepIndex]?.to.toArray()};sequence=null;event('blockedApproach',failure);pendingCancel=false;
  if(state==='poolExit'&&active===pool&&water){
   // A newly blocked deck access must not leave a standing visitor over water.
   // Return along the entry opening and keep swimming until the access is free.
   const anchor=pool.swimAnchor.clone();anchor.y=water.surface;
   begin('poolEnter',[moveStep(anchor,Math.max(1.2,distanceXZ(player.position,anchor)),{yaw:pool.yaw,pose:{treadWater:1,kind:'pool'}})],()=>setState('swimming'));
   return;
  }
  setPoseTarget({});setState('idle');active=null;saved=null;onTransitionEnd({position:player.position.clone(),yaw:getYaw()});showPrompt({visible:true,text:'Aproxime-se pelo acesso livre.',key:'',busy:false});
 }
 function startSeat(item){
  active=item;save();const p=item.position.clone();if(item.cushionY!==undefined)p.y=item.cushionY+(item.pelvisAboveCushion??.105)-(item.clipHipHeight??.53);
  const steps=[];
  if(item.dynamic){
   p.add(item.dynamic.offset);
   steps.push(...approachSteps({...item,approachPath:[item.approach.toArray()]}));
   steps.push(moveStep(item.approach,.9,{chair:1,yaw:item.yaw,pose:{}}));
  }
  steps.push(...approachSteps(item),moveStep(p,.95,{yaw:item.yaw,pose:{[item.poseKey||'sit']:1,kind:'seat'}}));
  begin('seatEnter',steps,()=>{setState('seated');if(pendingCancel)cancel();});return true;
 }
 function exitSeat(){
  const front=vec(active.standPosition||active.approach),steps=[moveStep(front,.95,{yaw:active.yaw,pose:{sit:0,kind:'seat'}})];
  if(active.dynamic){
   const path=[...(active.approachPath||[])].reverse();let previous=front;
   for(const point of path){const next=vec(point);if(distanceXZ(previous,next)<.015)continue;steps.push(moveStep(next,Math.max(.22,distanceXZ(previous,next)/1.05),{walk:true,pose:{},yaw:Math.atan2(next.x-previous.x,next.z-previous.z)}));previous=next;}
   if(distanceXZ(previous,active.approach)>.015)steps.push(moveStep(active.approach,Math.max(.22,distanceXZ(previous,active.approach)/1.05),{walk:true,pose:{},yaw:Math.atan2(active.approach.x-previous.x,active.approach.z-previous.z)}));
   steps.push(moveStep(active.approach,.9,{chair:0,pose:{}}));
  }
  begin('seatExit',steps,standingComplete);return true;
 }
 function startCar(){
  if(!car)return false;
  if((car.doors||[]).length&&!doors.length){event('missingDoorPivot');return false;}
  active=car;save();const inside=car.position.clone();if(car.seatCushionY!==undefined)inside.y=car.seatCushionY+(car.pelvisAboveCushion??.064)-(car.clipHipHeight??.494);
  const steps=approachSteps(car),atApproach=car.approach.clone();
  // Open the door with both feet supported. The CarSeat clip has raised,
  // bent legs, so applying it here made the visitor sit in the air outside.
  steps.push(moveStep(atApproach,.9,{walk:true,yaw:car.yaw,door:1,pose:{carSeat:0,kind:'car'}}));
  const path=car.enterPath||[car.approach.clone().lerp(inside,.45).toArray(),inside.toArray()];
  // Take the initial short step toward the door while standing, then lower
  // the body together with the bent-leg pose. Finish folding before the
  // cabin threshold, where the Countach roof needs the full low pose.
  path.forEach((point,i)=>steps.push(moveStep(point,.9,{yaw:car.yaw,pose:{carSeat:1,kind:'car'},carPoseRange:i===0?[.22,.60]:[0,1]})));
  steps.push(moveStep(inside,.9,{yaw:car.yaw,door:0,pose:{carSeat:1,kind:'car'}}));
  begin('carEnter',steps,()=>{setState('carSeated');if(pendingCancel)cancel();});return true;
 }
 function exitCar(){
  const steps=[moveStep(player.position,.8,{door:1,pose:{carSeat:1,kind:'car'}})];
  const path=car.exitPath||(car.enterPath?[...car.enterPath].slice(0,-1).reverse().concat([car.approach.toArray()]):[car.position.clone().lerp(car.approach,.55).toArray(),car.approach.toArray()]);
  // Stay low under the roof and unfold only after passing back through the
  // door opening; the vertical root movement follows the same pose blend.
  path.forEach((point,i)=>steps.push(moveStep(point,.68,{yaw:car.yaw,pose:{carSeat:i===path.length-1?0:1,kind:'car'},carPoseRange:i===path.length-1?[.40,1]:[0,1]})));
  steps.push(moveStep(car.approach,.85,{door:0,pose:{}}));begin('carExit',steps,standingComplete);return true;
 }
 function startPool(){
  if(!pool||!water)return false;active=pool;save();swimVelocity.set(0,0,0);
  const steps=approachSteps(pool),path=pool.enterPath||[pool.entry.toArray(),pool.swimAnchor.toArray()];
  path.forEach((point,i)=>{
   const p=vec(point),dry=p.x>=water.hi.x||p.x<=water.lo.x||p.z<=water.lo.z||p.z>=water.hi.z;
   steps.push(moveStep(p,i===path.length-1?1.05:.75,{walk:dry,yaw:pool.yaw,pose:dry?{}:{treadWater:i===path.length-1?1:.2,kind:'pool'}}));
  });
  begin('poolEnter',steps,()=>{water.ripple(player.position,1);setState('swimming');setPoseTarget({treadWater:1,kind:'pool'});if(pendingCancel)cancel();});return true;
 }
 function exitPool(){
  if(!pool||!water)return false;
  const anchor=pool.swimAnchor.clone(),distance=distanceXZ(player.position,anchor),returning=distance>.2;
  anchor.y=water.surface+(returning?(pool.swimRootOffset??-.08):0);
  const exitYaw=pool.exitYaw??pool.yaw+Math.PI,returnYaw=returning?Math.atan2(anchor.x-player.position.x,anchor.z-player.position.z):exitYaw;
  const steps=[moveStep(anchor,Math.max(.35,distance/(pool.swimSpeed??1.08)),{yaw:returnYaw,pose:returning?{swim:1,waterMotion:1,kind:'pool'}:{treadWater:1,kind:'pool'}})];
  const path=pool.exitPath||(pool.enterPath?[...pool.enterPath].slice(0,-1).reverse().concat([pool.approach.toArray()]):[pool.entry.toArray(),pool.approach.toArray()]);
  let previous=anchor;
  path.forEach(point=>{
   const p=vec(point),dry=p.x>=water.hi.x||p.x<=water.lo.x||p.z<=water.lo.z||p.z>=water.hi.z;
   // The ladder bridges water to the deck while the standing capsule has no
   // floor yet. Resume capsule walking only after the full deck landing is
   // supported; checking that capsule at the start of this climb traps exit.
   const startsSupported=dry&&safeWalkTarget(previous)!==null;
   steps.push(moveStep(p,.82,{walk:startsSupported,supportAtEnd:dry&&!startsSupported,yaw:exitYaw,pose:dry?{}:{treadWater:.2,kind:'pool'}}));previous=p;
  });
  begin('poolExit',steps,()=>{water.ripple(anchor,.65);standingComplete();});return true;
 }
 function activate(){
  if(disposed||!getIsExploring())return false;
  if(sequence)return false;
  if(state==='seated')return exitSeat();if(state==='carSeated')return exitCar();if(state==='swimming')return exitPool();
  const nearest=nearestInteraction();if(!nearest)return false;
  return nearest.kind==='pool'?startPool():nearest.kind==='car'?startCar():startSeat(nearest.item);
 }
 function enterWaterFromMotion(){
  if(disposed||state!=='idle'||!pool||!water||player.position.y>water.surface+.035)return false;
  const margin=.12;if(player.position.x<water.lo.x+margin||player.position.x>water.hi.x-margin||player.position.z<water.lo.z+margin||player.position.z>water.hi.z-margin)return false;
  active=pool;save();saved.position=safeWalkTarget(pool.approach)||pool.approach.clone();
  swimVelocity.set(0,0,0);player.position.y=water.surface;setPoseTarget({treadWater:1,kind:'pool'});pose.treadWater=1;pose.kind='pool';
  water.ripple(player.position,1.7);setState('swimming');event('waterLanding');emitPrompt();return true;
 }
 function cancel(){
  if(disposed||state==='idle')return false;
  if(sequence){pendingCancel=true;event('queuedExit');return true;}
  return activate();
 }
 function handleKey(event,isDown=true){
  const key=typeof event==='string'?event:event.code||event.key;
  if(!isDown||(typeof event!=='string'&&event.repeat))return false;
  const handled=/^(KeyE|e|E)$/.test(key)?activate():/^(Escape|Esc)$/.test(key)?cancel():false;
  if(handled&&typeof event!=='string')event.preventDefault?.();return handled;
 }
 function updateSequence(dt){
  const step=sequence.steps[stepIndex];stepElapsed+=dt;const progress=clamp(stepElapsed/step.duration,0,1),u=ease(progress);
  const target=step.start.clone().lerp(step.to,u);
  if(step.chair!==null)chair(THREE.MathUtils.lerp(step.startChair,step.chair,u));
  const synchronizedCarPose=!!step.carPoseRange;
  if(synchronizedCarPose){
   const [from,to]=step.carPoseRange,poseProgress=ease(clamp((progress-from)/Math.max(.001,to-from),0,1));
   pose.carSeat=THREE.MathUtils.lerp(step.startCarPose,step.pose?.carSeat||0,poseProgress);
   // CarSeat raises the feet relative to its root. Coupling the root descent
   // to this same weight avoids a seated pose floating before the root drops.
   target.y=THREE.MathUtils.lerp(step.start.y,step.to.y,poseProgress);
  }
  if(step.walk){const supported=safeWalkTarget(target);if(!supported){failWalk();return;}player.position.copy(supported);}else player.position.copy(target);
  if(step.yaw!==null){player.rotation.y=angleLerp(step.startYaw,step.yaw,u);setYaw(angleLerp(step.viewYaw,step.yaw+Math.PI,u));}
  if(step.door!==null)door(THREE.MathUtils.lerp(step.startDoor,step.door,u));
  if(progress===1){
   if(step.supportAtEnd){const supported=safeWalkTarget(target);if(!supported){failWalk();return;}player.position.copy(supported);}
   stepIndex++;stepElapsed=0;
   if(stepIndex>=sequence.steps.length){const complete=sequence.complete;sequence=null;complete();}
   else startStep();
  }
  // A completed door/approach step can select the next folding step above.
  // Do not damp toward that new target until its actual path has advanced.
  return synchronizedCarPose||!!sequence?.steps[stepIndex]?.carPoseRange;
 }
 function updateSwimming(dt,input){
  const angle=input.yaw??getYaw(),forward=new THREE.Vector3(-Math.sin(angle),0,-Math.cos(angle)),right=new THREE.Vector3(Math.cos(angle),0,-Math.sin(angle));
  const desired=forward.multiplyScalar(input.forward||0).addScaledVector(right,input.strafe||0);
  const moving=desired.lengthSq()>.0001;
  if(moving)desired.normalize().multiplyScalar(pool.swimSpeed??1.08);
  swimVelocity.lerp(desired,1-Math.exp(-(moving?4.8:7)*dt));
  const previous=player.position.clone();player.position.addScaledVector(swimVelocity,dt);
  const edge=pool.swimMargin??1.02;player.position.x=clamp(player.position.x,water.lo.x+edge,water.hi.x-edge);player.position.z=clamp(player.position.z,water.lo.z+edge,water.hi.z-edge);
  const speed=distanceXZ(previous,player.position)/Math.max(dt,.001),weight=clamp(speed/.6,0,1);
  player.position.y=water.surface+(pool.swimRootOffset??-.08)*weight+.011*Math.sin(time*1.5);
  if(speed>.02){const direction=player.position.clone().sub(previous);player.rotation.y=angleLerp(player.rotation.y,Math.atan2(direction.x,direction.z),1-Math.exp(-8*dt));}
  setPoseTarget({swim:weight,treadWater:1-weight,waterMotion:weight,kind:'pool'});
  if(speed>.06&&time-lastWaterRipple>.55){water.ripple(player.position,.35);lastWaterRipple=time;}
 }
 function update(dt,input={}){
  if(disposed)return;dt=clamp(dt,0,.1);time+=dt;water?.update(dt,time);
  if(!getIsExploring()){
   // A restart/navigation action must call reset() before leaving exploration.
   // This branch leaves the aerial route entirely in its existing owner.
   showPrompt({});return;
  }
  let synchronizedCarPose=false;
  if(sequence)synchronizedCarPose=updateSequence(dt);else if(state==='swimming')updateSwimming(dt,input);
  for(const field of ['sit','carSeat','lounger','swim','treadWater','waterMotion'])if(field!=='carSeat'||!synchronizedCarPose)pose[field]=THREE.MathUtils.damp(pose[field],targetPose[field]||0,7,dt);
  pose.time=time;pose.kind=targetPose.kind;emitPrompt();
 }
 function getEyeHeight(normal=1.64){return normal-(normal-1.18)*pose.sit-(normal-(car?.eyeHeight??1.12))*pose.carSeat-(normal-(active?.eyeHeight??.92))*pose.lounger-(normal-.14)*pose.swim-(normal-.24)*pose.treadWater;}
 function getFirstPersonOffset(){return new THREE.Vector3(Math.sin(player.rotation.y),0,Math.cos(player.rotation.y)).multiplyScalar(.78*pose.swim+(car?.eyeForward??.03)*pose.carSeat+(active?.eyeForward??-.28)*pose.lounger);}
 function getFocusHeight(normal=1.2){return normal-(normal-.82)*pose.sit-(normal-.61)*pose.carSeat-(normal-(active?.focusHeight??.67))*pose.lounger-(normal-.13)*(pose.swim+pose.treadWater);}
 function getPose(){return{...pose,approachWalk:!!(sequence?.steps[stepIndex]?.walk),seatSupport:active&&/^seat/.test(state)&&active.footSupportY!==undefined?{y:active.footSupportY,forward:active.footSupportForward,mode:active.footSupportMode}:null};}
 function getState(){return{state,id:active?.id||null,movementLocked:isMovementLocked(),transition:!!sequence,transitionProgress:sequence?clamp(stepElapsed/sequence.steps[stepIndex].duration,0,1):1,doorAmount,chairAmount:active?.dynamic?.amount||0,seatCount:seatDefinitions.length,pose:getPose(),position:player.position.toArray(),nearest:nearestInteraction()?.item.id||null,water:water?{visible:water.mesh.visible,surfaceY:water.surface,normalOffset:water.normal.offset.toArray(),bounds:[water.lo.toArray(),water.hi.toArray()]}:null,events:[...events]};}
 function reset({restore=true}={}){
  if(saved&&restore){const supported=safeWalkTarget(saved.position);if(supported)player.position.copy(supported);setYaw(saved.yaw);player.rotation.y=saved.playerYaw;}
  chair(0);for(const item of seatDefinitions)if(item.dynamic){item.dynamic.node.position.copy(item.dynamic.base);item.dynamic.amount=0;item.dynamic.node.updateMatrixWorld(true);}sequence=null;active=null;saved=null;pendingCancel=false;swimVelocity.set(0,0,0);setPoseTarget({});pose={...targetPose};door(0);setState('idle');showPrompt({});onTransitionEnd({position:player.position.clone(),yaw:getYaw()});
 }
 function dispose(){if(disposed)return;reset();water?.dispose();disposed=true;}
 return{update,handleKey,activate,cancel,enterWaterFromMotion,reset,dispose,isMovementLocked,getEyeHeight,getFocusHeight,getFirstPersonOffset,getPose,getState,water};
}
