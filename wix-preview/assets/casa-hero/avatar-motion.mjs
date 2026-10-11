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

// Seated upholstery heights vary. Keep the feet on their actual floor or
// stool rail while retaining the clip's hip placement and foot orientation.
// Walking, stairs, swimming and the independently baked car/lounger clips
// never enter this solver.
export function createSeatedFootPlacement(player,model,bones,octree){
 const q=new THREE.Quaternion(),point=new THREE.Vector3(),floorRay=new THREE.Ray(),down=new THREE.Vector3(0,-1,0),chains=['Left','Right'].map(side=>({side,upper:bones[side+'UpLeg'],lower:bones[side+'Leg'],foot:bones[side+'Foot'],vertices:[]}));
 model.traverse(mesh=>{
  if(!mesh.isSkinnedMesh)return;const index=mesh.geometry.attributes.skinIndex,weight=mesh.geometry.attributes.skinWeight;
  for(const chain of chains){const footBones=new Set(mesh.skeleton.bones.map((bone,i)=>new RegExp(chain.side+'(Foot|Toe)','i').test(bone.name)?i:-1).filter(i=>i>=0)),vertices=[];
   for(let i=0;i<index.count;i++)for(let k=0;k<4;k++)if(footBones.has(index.getComponent(i,k))&&weight.getComponent(i,k)>.45){vertices.push(i);break;}
   if(vertices.length)chain.vertices.push({mesh,indices:vertices});
  }
 });
 let report=null;
 const world=bone=>bone.getWorldPosition(new THREE.Vector3());
 function turn(bone,from,to){const delta=new THREE.Quaternion().setFromUnitVectors(from.normalize(),to.normalize()),desired=delta.multiply(bone.getWorldQuaternion(new THREE.Quaternion()));bone.quaternion.copy(bone.parent.getWorldQuaternion(q).invert().multiply(desired));bone.updateWorldMatrix(false,true);}
 function update(blend,support){
  if(!support||blend<=.7){report=null;return;}
  const amount=THREE.MathUtils.smoothstep(blend,.7,.995);model.updateWorldMatrix(true,true);const corrections=[];
  for(const chain of chains){
   if(!chain.upper||!chain.lower||!chain.foot||!chain.vertices.length)continue;
   let sole=Infinity;for(const group of chain.vertices){group.mesh.skeleton.update();for(const index of group.indices){group.mesh.getVertexPosition(index,point);point.applyMatrix4(group.mesh.matrixWorld);sole=Math.min(sole,point.y);}}
   const hip=world(chain.upper),knee=world(chain.lower),ankle=world(chain.foot),rotation=chain.foot.getWorldQuaternion(new THREE.Quaternion()),goal=ankle.clone();let supportY=support.y;
   if(support.forward!==undefined){const forward=new THREE.Vector3(0,0,1).applyQuaternion(player.quaternion),side=new THREE.Vector3(1,0,0).applyQuaternion(player.quaternion);goal.x=player.position.x+forward.x*support.forward+side.x*(chain.side==='Left'?.115:-.115);goal.z=player.position.z+forward.z*support.forward+side.z*(chain.side==='Left'?.115:-.115);}
   if(support.mode==='floor'&&octree){floorRay.set(new THREE.Vector3(goal.x,support.y+.19,goal.z),down);const hit=octree.rayIntersect(floorRay);if(hit&&hit.distance<=.35&&hit.triangle.getNormal(new THREE.Vector3()).y>.55)supportY=hit.position.y;}
   goal.y+=supportY+.002-sole;
   goal.lerp(ankle,1-amount);const l1=hip.distanceTo(knee),l2=knee.distanceTo(ankle),axis=goal.clone().sub(hip),requested=axis.length(),distance=THREE.MathUtils.clamp(requested,Math.abs(l1-l2)+.002,(l1+l2)*.997);axis.normalize();
   const along=(l1*l1-l2*l2+distance*distance)/(2*distance),height=Math.sqrt(Math.max(0,l1*l1-along*along)),pole=knee.clone().sub(hip).addScaledVector(axis,-knee.clone().sub(hip).dot(axis));
   if(pole.lengthSq()<1e-7)pole.set(0,0,1).applyQuaternion(player.quaternion).addScaledVector(axis,-axis.z);pole.normalize();
   const goalKnee=hip.clone().addScaledVector(axis,along).addScaledVector(pole,height);turn(chain.upper,knee.clone().sub(hip),goalKnee.clone().sub(hip));const currentKnee=world(chain.lower),currentAnkle=world(chain.foot);turn(chain.lower,currentAnkle.sub(currentKnee),goal.clone().sub(currentKnee));chain.foot.quaternion.copy(chain.foot.parent.getWorldQuaternion(q).invert().multiply(rotation));chain.foot.updateWorldMatrix(false,true);
   corrections.push({side:chain.side,soleBefore:sole,supportY,target:goal.toArray(),reachError:Math.max(0,requested-distance),amount});
  }
  report={corrections};
 }
 return{update,metrics:()=>report};
}

export function spring(state,target,omega,dt){
 const change=state.value-target,decay=Math.exp(-omega*dt),step=(state.velocity+omega*change)*dt;
 state.value=target+(change+step)*decay;
 state.velocity=(state.velocity-omega*step)*decay;
 return state.value;
}
