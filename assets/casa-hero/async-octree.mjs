import {Box3,Vector3} from 'three';
import {Octree} from 'three/addons/math/Octree.js';

// Yield a task, rather than an animation frame: a preloading iframe can be
// invisible and must still finish preparing without monopolizing the parent.
export function yieldMainThread(){
 if(globalThis.scheduler?.yield)return globalThis.scheduler.yield();
 return new Promise(resolve=>setTimeout(resolve,0));
}

export function createYieldBudget(milliseconds=8){
 let sliceStart=performance.now(),yields=0,maxSliceMs=0;
 const sample=()=>{const elapsed=performance.now()-sliceStart;maxSliceMs=Math.max(maxSliceMs,elapsed);return elapsed;};
 return{
  check(){
   if(sample()<milliseconds)return null;
   yields++;
   return yieldMainThread().then(()=>{sliceStart=performance.now();});
  },
  finish(){sample();return{budgetMs:milliseconds,yields,maxSliceMs};},
 };
}

// This is Three r180's split order and data structure, cooperatively scheduled.
// Queries remain Three's original ray/capsule methods. No geometry is simplified.
// The old viewer forced these limits on every recursive Octree.split invocation.
export async function buildOctreeCooperatively(tree,{trianglesPerLeaf=36,maxLevel=6,budgetMs=8}={}){
 const budget=createYieldBudget(budgetMs),started=performance.now();let nodes=0,assignments=0;
 tree.calcBox();
 async function split(node,level){
  if(!node.box)return;
  node.trianglesPerLeaf=trianglesPerLeaf;node.maxLevel=maxLevel;
  const children=[],halfsize=new Vector3().subVectors(node.box.max,node.box.min).multiplyScalar(.5);
  for(let x=0;x<2;x++)for(let y=0;y<2;y++)for(let z=0;z<2;z++){
   const box=new Box3();box.min.copy(node.box.min).add(new Vector3(x,y,z).multiply(halfsize));box.max.copy(box.min).add(halfsize);
   children.push(new Octree(box));nodes++;
  }
  let triangle,processed=0;
  while((triangle=node.triangles.pop())){
   for(const child of children)if(child.box.intersectsTriangle(triangle)){child.triangles.push(triangle);assignments++;}
   if((++processed&127)===0){const pending=budget.check();if(pending)await pending;}
  }
  for(const child of children){
   const length=child.triangles.length;
   if(length>node.trianglesPerLeaf&&level<node.maxLevel)await split(child,level+1);
   if(length!==0)node.subTrees.push(child);
   const pending=budget.check();if(pending)await pending;
  }
 }
 await split(tree,0);
 return{durationMs:performance.now()-started,nodes,assignments,trianglesPerLeaf,maxLevel,...budget.finish()};
}
