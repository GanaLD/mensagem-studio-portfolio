import * as THREE from 'three';

// Two-bone correction keeps the captured walk on the actual treads.
export function createFootPlacement(player,model,bones,octree){
 const down=new THREE.Vector3(0,-1,0),ray=new THREE.Ray(),q=new THREE.Quaternion();
 const chains=['Left','Right'].map(side=>({upper:bones[side+'UpLeg'],lower:bones[side+'Leg'],foot:bones[side+'Foot'],anchor:null,planted:false}));
 const world=o=>o.getWorldPosition(new THREE.Vector3());
 function turn(bone,from,to){
  const delta=new THREE.Quaternion().setFromUnitVectors(from.normalize(),to.normalize());
  const desired=delta.multiply(bone.getWorldQuaternion(new THREE.Quaternion()));
  bone.quaternion.copy(bone.parent.getWorldQuaternion(q).invert().multiply(desired));
  bone.updateWorldMatrix(false,true);
 }
 function reset(){for(const c of chains){c.anchor=null;c.planted=false;}}
 function update(blend,moving){
  model.updateWorldMatrix(true,true);
  const baseY=player.position.y+model.position.y;
  for(const c of chains){
   if(!c.upper||!c.lower||!c.foot)continue;
   const hip=world(c.upper),knee=world(c.lower),ankle=world(c.foot);
   const footRotation=c.foot.getWorldQuaternion(new THREE.Quaternion());
   const lift=Math.max(0,ankle.y-baseY-.085);
   const contact=moving&&blend>.5&&lift<.035;
   if(contact&&!c.planted)c.anchor=ankle.clone();
   if(!contact||!c.anchor||Math.hypot(c.anchor.x-ankle.x,c.anchor.z-ankle.z)>.44)c.anchor=null;
   c.planted=contact;
   const target=c.anchor?c.anchor.clone():ankle.clone();
   ray.set(new THREE.Vector3(target.x,Math.max(baseY,ankle.y)+.5,target.z),down);
   const hit=octree.rayIntersect(ray);
   if(!hit||hit.distance>1.15||hit.triangle.getNormal(new THREE.Vector3()).y<.55)continue;
   target.y=hit.position.y+.085+(contact?0:lift);
   // Avoid reacting to nearby tabletops or unsupported adjacent space.
   if(Math.abs(target.y-ankle.y)>.38)continue;
   const l1=hip.distanceTo(knee),l2=knee.distanceTo(ankle),axis=target.clone().sub(hip);
   const distance=THREE.MathUtils.clamp(axis.length(),Math.abs(l1-l2)+.002,(l1+l2)*.997);axis.normalize();
   const along=(l1*l1-l2*l2+distance*distance)/(2*distance);
   const height=Math.sqrt(Math.max(0,l1*l1-along*along));
   const pole=knee.clone().sub(hip).addScaledVector(axis,-knee.clone().sub(hip).dot(axis));
   if(pole.lengthSq()<1e-7)pole.set(0,0,1).applyQuaternion(player.quaternion).addScaledVector(axis,-axis.z);
   pole.normalize();
   const goalKnee=hip.clone().addScaledVector(axis,along).addScaledVector(pole,height);
   turn(c.upper,knee.clone().sub(hip),goalKnee.clone().sub(hip));
   const currentKnee=world(c.lower),currentAnkle=world(c.foot);
   turn(c.lower,currentAnkle.sub(currentKnee),target.clone().sub(currentKnee));
   c.foot.quaternion.copy(c.foot.parent.getWorldQuaternion(q).invert().multiply(footRotation));
   c.foot.updateWorldMatrix(false,true);
  }
 }
 return {update,reset};
}

export function spring(state,target,omega,dt){
 const change=state.value-target,decay=Math.exp(-omega*dt),step=(state.velocity+omega*change)*dt;
 state.value=target+(change+step)*decay;
 state.velocity=(state.velocity-omega*step)*decay;
 return state.value;
}
