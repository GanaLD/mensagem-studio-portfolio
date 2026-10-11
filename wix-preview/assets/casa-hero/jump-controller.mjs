import * as THREE from 'three';
import {Capsule} from 'three/addons/math/Capsule.js';

// Ground locomotion stays in its accepted stair resolver. This controller
// owns only the interval from takeoff to a supported landing.
export function createJumpController({player,octree,supportAt,resolvePosition,resolveDynamic=p=>p,radius=.23,height=1.78,onLand=()=>{},onRecover=()=>{}}){
 const GRAVITY=13.4,IMPULSE=5.1,capsule=new Capsule(),safe=player.position.clone();
 let airborne=false,queued=false,verticalSpeed=0,elapsed=0,landing=0,jumps=0,recoveries=0,ceilingHits=0,landings=0;
 function bounds(p){capsule.start.set(p.x,p.y+radius+.01,p.z);capsule.end.set(p.x,p.y+height-radius,p.z);capsule.radius=radius;}
 function request(){
  if(airborne||queued||landing>.06)return false;
  const floor=supportAt(player.position);if(floor===null||Math.abs(floor-player.position.y)>.045)return false;
  queued=true;return true;
 }
 function reset(){airborne=false;queued=false;verticalSpeed=0;elapsed=0;landing=0;safe.copy(player.position);}
 function finish(floor){
  player.position.y=floor;verticalSpeed=0;airborne=false;landing=.16;landings++;safe.copy(player.position);onLand();
 }
 function update(dt,horizontal){
  landing=Math.max(0,landing-dt);
  if(queued){queued=false;airborne=true;verticalSpeed=IMPULSE;elapsed=0;jumps++;safe.copy(player.position);}
  if(!airborne){if(supportAt(player.position)!==null)safe.copy(player.position);return null;}
  elapsed+=dt;const start=player.position.clone(),dy=verticalSpeed*dt-.5*GRAVITY*dt*dt;verticalSpeed-=GRAVITY*dt;
  const delta=horizontal.clone();delta.y=dy;
  const count=Math.max(1,Math.ceil(delta.length()/.045));delta.multiplyScalar(1/count);
  for(let i=0;i<count&&airborne;i++){
   const previous=player.position.clone(),trial=previous.clone().add(delta);
   if(verticalSpeed<=0){
    const floor=supportAt(trial.clone().setY(previous.y));
    if(floor!==null&&trial.y<=floor&&previous.y>=floor-.025){
     const supported=resolvePosition(trial.clone().setY(floor));
     if(supported){player.position.copy(supported);finish(supported.y);break;}
    }
   }
   for(let pass=0;pass<5;pass++){
    bounds(trial);const hit=octree.capsuleIntersect(capsule);if(!hit||hit.depth<.00001)break;
    trial.addScaledVector(hit.normal,hit.depth+.001);
    if(hit.normal.y<-.5&&verticalSpeed>0){verticalSpeed=0;delta.y=Math.min(0,delta.y);ceilingHits++;}
    if(hit.normal.y>.55&&verticalSpeed<=0){
     const supported=resolvePosition(trial);
     if(supported){player.position.copy(supported);finish(supported.y);break;}
    }
   }
   if(airborne){resolveDynamic(trial);bounds(trial);const overlap=octree.capsuleIntersect(capsule);if(!overlap||overlap.depth<.035)player.position.copy(trial);else{player.position.y=Math.min(previous.y,trial.y);}}
  }
  if(player.position.y<safe.y-8||!player.position.toArray().every(Number.isFinite)){
   const supported=resolvePosition(safe);if(supported)player.position.copy(supported);else player.position.copy(safe);
   recoveries++;reset();onRecover();
  }
  const movement=player.position.clone().sub(start);movement.y=0;
  if(movement.lengthSq()>.000001){const angle=Math.atan2(movement.x,movement.z);player.rotation.y+=Math.atan2(Math.sin(angle-player.rotation.y),Math.cos(angle-player.rotation.y))*(1-Math.exp(-12*dt));}
  return movement.length();
 }
 function pose(){
  if(airborne)return{weight:1,time:verticalSpeed>=0?.12+.34*Math.min(1,elapsed/(IMPULSE/GRAVITY)):.46+.36*Math.min(1,-verticalSpeed/IMPULSE),airborne:true};
  return{weight:landing/.16,time:.9+(1-landing/.16)*.1,airborne:false};
 }
 return{request,update,reset,pose,get airborne(){return airborne;},get queued(){return queued;},metrics:()=>({airborne,queued,verticalSpeed,elapsed,landing,jumps,landings,ceilingHits,recoveries,gravity:GRAVITY,impulse:IMPULSE})};
}
