let modulePromise;const active=new WeakMap();
async function loadThree(){if(!modulePromise)modulePromise=import('https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.module.js');return modulePromise;}
export async function mount(el,options={}){
  destroy(el);if(options.reduced||matchMedia('(prefers-reduced-motion: reduce)').matches){el.dataset.sfMotionResolvedEngine='css_native';return {engine:'css_native',destroy(){delete el.dataset.sfMotionResolvedEngine;}};}
  const THREE=await loadThree();const canvas=document.createElement('canvas');canvas.className='sf-motion-three-canvas';canvas.setAttribute('aria-hidden','true');el.prepend(canvas);
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<768?1.25:1.75));
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,.1,20);camera.position.z=3;const count=innerWidth<768?38:72;const positions=new Float32Array(count*3);for(let i=0;i<positions.length;i++)positions[i]=(Math.random()-.5)*4;const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));const material=new THREE.PointsMaterial({size:.028,color:0x8fffe0,transparent:true,opacity:.65});const points=new THREE.Points(geometry,material);scene.add(points);let raf=0,stopped=false;
  const resize=()=>{const r=el.getBoundingClientRect();const w=Math.max(1,r.width),h=Math.max(1,r.height);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
  const tick=()=>{if(stopped)return;points.rotation.y+=.0018;points.rotation.x+=.0007;renderer.render(scene,camera);raf=requestAnimationFrame(tick);};resize();addEventListener('resize',resize,{passive:true});tick();el.dataset.sfMotionResolvedEngine='threejs';
  const resource={destroy(){stopped=true;cancelAnimationFrame(raf);removeEventListener('resize',resize);geometry.dispose();material.dispose();renderer.dispose();canvas.remove();delete el.dataset.sfMotionResolvedEngine;}};active.set(el,resource);return {engine:'threejs',pause:()=>{stopped=true;cancelAnimationFrame(raf);},resume:()=>{if(stopped){stopped=false;tick();}},destroy:()=>destroy(el)};
}
export function destroy(el){try{active.get(el)?.destroy?.();}catch(_){}active.delete(el);}
