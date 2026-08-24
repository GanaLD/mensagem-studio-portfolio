let modulePromise;const active=new WeakMap();
async function loadThree(){if(!modulePromise)modulePromise=import(new URL('../vendor/three/three.module.min.js',import.meta.url).href);return modulePromise;}

export async function mount(el,options={}){
  destroy(el);if(options.reduced||matchMedia('(prefers-reduced-motion: reduce)').matches){el.dataset.sfMotionResolvedEngine='css_native';return {engine:'css_native',destroy(){delete el.dataset.sfMotionResolvedEngine;}};}
  const THREE=await loadThree(),preset=options.preset||'background-particles',factor=Number(options.intensityFactor||1);
  const canvas=document.createElement('canvas');canvas.className=`sf-motion-three-canvas sf-motion-three-${preset}`;canvas.setAttribute('aria-hidden','true');el.prepend(canvas);
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:preset==='hero-3d',powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<768?1.25:1.75));
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,.1,20);camera.position.z=3;
  const resources=[];let subject=null,raf=0,stopped=false,elapsedOffset=0,startedAt=performance.now();
  const elapsedSeconds=()=>elapsedOffset+Math.max(0,performance.now()-startedAt)/1000;

  if(preset==='hero-3d'){
    const geometry=new THREE.IcosahedronGeometry(.88,innerWidth<768?1:2),material=new THREE.MeshPhysicalMaterial({color:0x111b1a,emissive:0x0c352d,emissiveIntensity:.7,metalness:.55,roughness:.28,wireframe:false,transparent:true,opacity:.93});
    subject=new THREE.Mesh(geometry,material);scene.add(subject);scene.add(new THREE.AmbientLight(0xb9fff0,1.5));const key=new THREE.PointLight(0x5cffd6,16,8);key.position.set(2,1.5,2);scene.add(key);resources.push(geometry,material);
  }else if(preset==='background-shader'){
    camera.position.z=1;const geometry=new THREE.PlaneGeometry(2,2),material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uTime:{value:0},uFactor:{value:factor}},vertexShader:'void main(){gl_Position=vec4(position,1.0);}',fragmentShader:'precision highp float;uniform float uTime;uniform float uFactor;void main(){vec2 p=gl_FragCoord.xy*.006;float a=sin(p.x*1.7+uTime*.42)*cos(p.y*1.25-uTime*.31);float glow=smoothstep(.92,.08,abs(a))*.18*uFactor;gl_FragColor=vec4(.12,.98,.76,glow);}' });
    subject=new THREE.Mesh(geometry,material);scene.add(subject);resources.push(geometry,material);
  }else{
    const count=innerWidth<768?38:72,positions=new Float32Array(count*3);for(let i=0;i<positions.length;i++)positions[i]=(Math.random()-.5)*4;
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));const material=new THREE.PointsMaterial({size:.028*factor,color:0x8fffe0,transparent:true,opacity:.65});subject=new THREE.Points(geometry,material);scene.add(subject);resources.push(geometry,material);
  }

  const resize=()=>{const r=el.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
  const tick=()=>{if(stopped)return;const elapsed=elapsedSeconds();if(preset==='hero-3d'){subject.rotation.y=elapsed*.24*factor;subject.rotation.x=Math.sin(elapsed*.31)*.2;}else if(preset==='background-shader')subject.material.uniforms.uTime.value=elapsed;else{subject.rotation.y+=.0018*factor;subject.rotation.x+=.0007*factor;}renderer.render(scene,camera);raf=requestAnimationFrame(tick);};
  resize();addEventListener('resize',resize,{passive:true});tick();el.dataset.sfMotionResolvedEngine='threejs';el.dataset.sfMotionThreePreset=preset;
  const resource={destroy(){stopped=true;cancelAnimationFrame(raf);removeEventListener('resize',resize);resources.forEach((resource)=>resource.dispose?.());renderer.dispose();canvas.remove();delete el.dataset.sfMotionResolvedEngine;delete el.dataset.sfMotionThreePreset;}};
  active.set(el,resource);return {engine:'threejs',pause:()=>{if(!stopped){elapsedOffset=elapsedSeconds();stopped=true;cancelAnimationFrame(raf);}},resume:()=>{if(stopped){stopped=false;startedAt=performance.now();tick();}},destroy:()=>destroy(el)};
}

export function destroy(el){try{active.get(el)?.destroy?.();}catch(_){}active.delete(el);}
