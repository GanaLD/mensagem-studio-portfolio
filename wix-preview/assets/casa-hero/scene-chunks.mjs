import * as THREE from 'three';

// Static material batches may span every room and the entire landscape.
// Reuse their original vertex buffers and distribute only triangle indices
// into bounded regions, so the camera can cull unseen regions. No material,
// vertex position, texture, skin, animation or vehicle hierarchy is changed.
export function partitionStaticScene(root,cellSize=6,maxChunksPerMesh=128){
 if(!(cellSize>0)||!Number.isInteger(maxChunksPerMesh)||maxChunksPerMesh<8)throw Error('Invalid static partition limits');
 const sources=[];root.updateMatrixWorld(true);
 root.traverse(mesh=>{
  if(!mesh.isMesh||mesh.isSkinnedMesh||mesh.children.length||Array.isArray(mesh.material)||mesh.geometry.groups.length>1)return;
  for(let parent=mesh;parent;parent=parent.parent)if(parent.name==='CASA_VEHICLE')return;
  const triangles=(mesh.geometry.index?.count||mesh.geometry.attributes.position.count)/3;
  if(triangles>=4000)sources.push(mesh);
 });
 const report={sourceMeshes:sources.length,chunks:0,trianglesBefore:0,trianglesAfter:0,sharedVertexBuffers:true,maxChunksPerMesh,sources:[]};
 for(const mesh of sources){
  const geometry=mesh.geometry,positions=geometry.attributes.position,index=geometry.index,count=index?.count||positions.count,m=mesh.matrixWorld.elements,buckets=new Map();
  if(!geometry.boundingBox)geometry.computeBoundingBox();
  const worldBounds=geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld),baseCell=[cellSize,4.1,cellSize],axes=['x','y','z'];
  let cellScale=1,gridCells;
  const estimatedCells=()=>axes.reduce((cells,axis,i)=>cells*(Math.floor(worldBounds.max[axis]/(baseCell[i]*cellScale))-Math.floor(worldBounds.min[axis]/(baseCell[i]*cellScale))+1),1);
  // A distant landscape can span thousands of small cells while containing
  // only a few triangles in each. Bound the whole possible grid before
  // assigning triangles, retaining small room cells wherever they fit.
  while((gridCells=estimatedCells())>maxChunksPerMesh)cellScale*=Math.max(1.1,Math.cbrt(gridCells/maxChunksPerMesh));
  const cellDimensions=baseCell.map(size=>size*cellScale);
  for(let offset=0;offset<count;offset+=3){
   const a=index?index.getX(offset):offset,b=index?index.getX(offset+1):offset+1,c=index?index.getX(offset+2):offset+2;
   const x=(positions.getX(a)+positions.getX(b)+positions.getX(c))/3,y=(positions.getY(a)+positions.getY(b)+positions.getY(c))/3,z=(positions.getZ(a)+positions.getZ(b)+positions.getZ(c))/3;
   const key=[Math.floor((m[0]*x+m[4]*y+m[8]*z+m[12])/cellDimensions[0]),Math.floor((m[1]*x+m[5]*y+m[9]*z+m[13])/cellDimensions[1]),Math.floor((m[2]*x+m[6]*y+m[10]*z+m[14])/cellDimensions[2])].join(',');
   let bucket=buckets.get(key);if(!bucket){bucket={indices:[],box:new THREE.Box3()};buckets.set(key,bucket);}
   bucket.indices.push(a,b,c);
   for(const vertex of [a,b,c]){const px=positions.getX(vertex),py=positions.getY(vertex),pz=positions.getZ(vertex),box=bucket.box;box.min.x=Math.min(box.min.x,px);box.min.y=Math.min(box.min.y,py);box.min.z=Math.min(box.min.z,pz);box.max.x=Math.max(box.max.x,px);box.max.y=Math.max(box.max.y,py);box.max.z=Math.max(box.max.z,pz);}
  }
  if(buckets.size>maxChunksPerMesh)throw Error('Static partition exceeded its region limit');
  report.sources.push({name:mesh.name,material:mesh.material.name,triangles:count/3,chunks:buckets.size,cellDimensions,gridCells,partitioned:buckets.size>1});
  report.trianglesBefore+=count/3;
  if(buckets.size<2){report.trianglesAfter+=count/3;continue;}
  const group=new THREE.Group();group.copy(mesh,false);group.name=mesh.name;
  let ordinal=0;
  for(const bucket of buckets.values()){
   const part=new THREE.BufferGeometry();
   for(const [name,attribute] of Object.entries(geometry.attributes))part.setAttribute(name,attribute);
   part.setIndex(new THREE.BufferAttribute(new Uint32Array(bucket.indices),1));
   // BufferGeometry's default bounds ignore the index and would include
   // every shared vertex. These bounds cover the actual subset instead.
   part.boundingBox=bucket.box;part.boundingSphere=bucket.box.getBoundingSphere(new THREE.Sphere());
   const child=new THREE.Mesh(part,mesh.material);child.name=mesh.name+'_region_'+ordinal++;
   child.castShadow=mesh.castShadow;child.receiveShadow=mesh.receiveShadow;child.renderOrder=mesh.renderOrder;
   group.add(child);report.chunks++;report.trianglesAfter+=bucket.indices.length/3;
  }
  const parent=mesh.parent;parent.add(group);parent.remove(mesh);
 }
 if(report.trianglesBefore!==report.trianglesAfter)throw Error('Static partition lost scene triangles');
 root.updateMatrixWorld(true);return report;
}
