(()=>{
  if(window.__MS_GLASS_BUTTON_V4__)return;
  window.__MS_GLASS_BUTTON_V4__=true;

  const selector=[
    '.cta-row .btn',
    '.btn',
    '.cart',
    '.add',
    '.cristo-v4-btn',
    '.ms-brief-action',
    '.ms-footer-link',
    '.ms-footer-links .bg-switcher button',
    '.ms-quote-fab',
    '.ms-menu-quote',
    '.ms-glass-cta',
    '.send',
    'button[type="submit"]',
    '.stage-side button'
  ].join(',');

  const protectedControl=el=>!!(
    el.closest('#msSectionNav')||
    el.closest('#ms-rubber-topnav-root')||
    el.closest('.rubber-segment')||
    el.closest('.iphone-showcase-shell')||
    el.classList.contains('ms-universal-menu-btn')||
    el.classList.contains('ms-contact-close')||
    el.classList.contains('ms-sound-toggle')||
    el.classList.contains('ms3d-card')||
    el.classList.contains('ms3d-edge')
  );

  const arrowOnly=value=>/^[\s↗↘↙↖↑↓→←⟶⟵›»]+$/.test((value||'').trim());

  const VERT=`
    attribute vec2 position;
    void main(){gl_Position=vec4(position,0.0,1.0);}
  `;

  /* Adapted for a transparent button overlay while preserving the indicated
     Liquid Glass Shader mask/lens constants and 9x9 sampling structure. */
  const FRAG=`
    precision mediump float;
    uniform vec3 iResolution;
    uniform float iTime;
    uniform vec4 iMouse;
    uniform vec3 iTint;

    const float NUM_ZERO=0.0;
    const float NUM_ONE=1.0;
    const float NUM_HALF=0.5;
    const float NUM_TWO=2.0;
    const float POWER_EXPONENT=6.0;
    const float MASK_MULTIPLIER_1=10000.0;
    const float MASK_MULTIPLIER_2=9500.0;
    const float MASK_MULTIPLIER_3=11000.0;
    const float LENS_MULTIPLIER=5000.0;
    const float MASK_STRENGTH_1=8.0;
    const float MASK_STRENGTH_2=16.0;
    const float MASK_STRENGTH_3=2.0;
    const float MASK_THRESHOLD_1=0.95;
    const float MASK_THRESHOLD_2=0.9;
    const float MASK_THRESHOLD_3=1.5;
    const float SAMPLE_RANGE=4.0;
    const float SAMPLE_OFFSET=0.5;
    const float GRADIENT_RANGE=0.2;
    const float GRADIENT_OFFSET=0.1;
    const float GRADIENT_EXTREME=-1000.0;
    const float LIGHTING_INTENSITY=0.3;

    float field(vec2 p){
      float wave=0.0;
      float total=0.0;
      for(float x=-SAMPLE_RANGE;x<=SAMPLE_RANGE;x++){
        for(float y=-SAMPLE_RANGE;y<=SAMPLE_RANGE;y++){
          vec2 q=p+vec2(x,y)*SAMPLE_OFFSET/max(iResolution.xy,vec2(1.0));
          wave+=0.5+0.5*sin((q.x*11.0+q.y*7.0+iTime*0.42)*6.2831853);
          total+=NUM_ONE;
        }
      }
      return wave/max(total,NUM_ONE);
    }

    void main(){
      vec2 fragCoord=gl_FragCoord.xy;
      vec2 uv=fragCoord/max(iResolution.xy,vec2(1.0));
      vec2 mouse=iMouse.xy;
      if(length(mouse)<NUM_ONE)mouse=iResolution.xy/NUM_TWO;
      vec2 mouseUV=mouse/max(iResolution.xy,vec2(1.0));
      vec2 m2=uv-mouseUV;

      float aspect=iResolution.x/max(iResolution.y,NUM_ONE);
      float roundedBox=
        pow(abs(m2.x*aspect),POWER_EXPONENT)+
        pow(abs(m2.y),POWER_EXPONENT);

      float rb1=clamp((NUM_ONE-roundedBox*MASK_MULTIPLIER_1)*MASK_STRENGTH_1,NUM_ZERO,NUM_ONE);
      float rb2=
        clamp((MASK_THRESHOLD_1-roundedBox*MASK_MULTIPLIER_2)*MASK_STRENGTH_2,NUM_ZERO,NUM_ONE)-
        clamp(pow(MASK_THRESHOLD_2-roundedBox*MASK_MULTIPLIER_2,NUM_ONE)*MASK_STRENGTH_2,NUM_ZERO,NUM_ONE);
      float rb3=
        clamp((MASK_THRESHOLD_3-roundedBox*MASK_MULTIPLIER_3)*MASK_STRENGTH_3,NUM_ZERO,NUM_ONE)-
        clamp(pow(NUM_ONE-roundedBox*MASK_MULTIPLIER_3,NUM_ONE)*MASK_STRENGTH_3,NUM_ZERO,NUM_ONE);

      float transition=smoothstep(NUM_ZERO,NUM_ONE,rb1+rb2);
      vec2 lens=((uv-NUM_HALF)*(NUM_ONE-roundedBox*LENS_MULTIPLIER)+NUM_HALF);
      float sampleField=field(lens);

      float gradient=
        clamp((clamp(m2.y,NUM_ZERO,GRADIENT_RANGE)+GRADIENT_OFFSET)/NUM_TWO,NUM_ZERO,NUM_ONE)+
        clamp((clamp(-m2.y,GRADIENT_EXTREME,GRADIENT_RANGE)*rb3+GRADIENT_OFFSET)/NUM_TWO,NUM_ZERO,NUM_ONE);

      float sheen=clamp(rb1*gradient+rb2*LIGHTING_INTENSITY,NUM_ZERO,NUM_ONE);
      float ripple=transition*(0.035+0.055*sampleField);
      vec3 tint=mix(vec3(1.0),iTint,0.22);
      vec3 rgb=tint*(sheen*0.74+ripple);
      float alpha=clamp(sheen*0.62+ripple*0.70,0.0,0.52);
      gl_FragColor=vec4(rgb,alpha);
    }
  `;

  function compile(gl,type,source){
    const shader=gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function installShader(el){
    if(el.dataset.msLiquidShader==='1')return;
    el.dataset.msLiquidShader='1';
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;

    // IMPORTANT: use ONE shared WebGL context for the whole page.
    // model-viewer also needs WebGL; one context per button can exhaust the browser limit
    // and make the Home 3D assets disappear.
    const state=window.__MS_SHARED_LIQUID_GLASS__||(window.__MS_SHARED_LIQUID_GLASS__={
      canvas:null,gl:null,program:null,buffer:null,position:-1,
      uResolution:null,uTime:null,uMouse:null,uTint:null,
      target:null,raf:0,start:performance.now(),mouse:[0,0],width:0,height:0
    });

    function ensureRenderer(){
      if(state.gl&&state.canvas)return true;
      const canvas=document.createElement('canvas');
      canvas.className='ms-liquid-glass-shader';
      canvas.setAttribute('aria-hidden','true');
      const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:true});
      if(!gl)return false;

      const vs=compile(gl,gl.VERTEX_SHADER,VERT);
      const fs=compile(gl,gl.FRAGMENT_SHADER,FRAG);
      if(!vs||!fs)return false;

      const program=gl.createProgram();
      gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))return false;
      gl.useProgram(program);

      const buffer=gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
      const position=gl.getAttribLocation(program,'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);

      state.canvas=canvas;
      state.gl=gl;
      state.program=program;
      state.buffer=buffer;
      state.position=position;
      state.uResolution=gl.getUniformLocation(program,'iResolution');
      state.uTime=gl.getUniformLocation(program,'iTime');
      state.uMouse=gl.getUniformLocation(program,'iMouse');
      state.uTint=gl.getUniformLocation(program,'iTint');
      return true;
    }

    function tint(target){
      const s=getComputedStyle(target);
      const r=Number(s.getPropertyValue('--ms-glass-tint-r'))||255;
      const g=Number(s.getPropertyValue('--ms-glass-tint-g'))||255;
      const b=Number(s.getPropertyValue('--ms-glass-tint-b'))||255;
      return [r/255,g/255,b/255];
    }

    function resize(){
      const target=state.target;
      if(!target||!state.canvas||!state.gl)return;
      const r=target.getBoundingClientRect();
      const dpr=Math.min(devicePixelRatio||1,2);
      const w=Math.max(1,Math.round(r.width*dpr));
      const h=Math.max(1,Math.round(r.height*dpr));
      if(w===state.width&&h===state.height)return;
      state.width=w;state.height=h;
      state.canvas.width=w;state.canvas.height=h;
      state.gl.viewport(0,0,w,h);
      state.mouse=[w*.5,h*.5];
    }

    function draw(){
      state.raf=0;
      if(!state.target||!state.canvas||!state.gl)return;
      resize();
      const gl=state.gl;
      const tc=tint(state.target);
      const t=(performance.now()-state.start)/1000;
      gl.useProgram(state.program);
      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform3f(state.uResolution,state.width,state.height,1);
      gl.uniform1f(state.uTime,t);
      gl.uniform4f(state.uMouse,state.mouse[0],state.mouse[1],0,0);
      gl.uniform3f(state.uTint,tc[0],tc[1],tc[2]);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    }

    function mount(target,event){
      if(!ensureRenderer())return;
      if(state.target!==target){
        state.target=target;
        state.width=0;state.height=0;
        target.insertBefore(state.canvas,target.firstChild);
      }
      if(event&&Number.isFinite(event.clientX)){
        const r=target.getBoundingClientRect();
        const dpr=Math.min(devicePixelRatio||1,2);
        state.mouse=[
          Math.max(0,Math.min(r.width,event.clientX-r.left))*dpr,
          Math.max(0,Math.min(r.height,r.bottom-event.clientY))*dpr
        ];
      }
      if(!state.raf)state.raf=requestAnimationFrame(draw);
    }

    function unmount(target){
      if(state.target!==target)return;
      if(target.matches(':focus-visible'))return;
      state.target=null;
      if(state.canvas?.parentNode)state.canvas.remove();
    }

    el.addEventListener('pointerenter',event=>mount(el,event),{passive:true});
    el.addEventListener('pointermove',event=>{
      if(state.target===el)mount(el,event);
    },{passive:true});
    el.addEventListener('pointerleave',()=>unmount(el),{passive:true});
    el.addEventListener('pointerdown',event=>mount(el,event),{passive:true});
    el.addEventListener('focus',()=>mount(el),{passive:true});
    el.addEventListener('blur',()=>unmount(el),{passive:true});
  }
  function apply(el){
    if(!el||protectedControl(el))return;
    el.classList.add('ms-glass-v26');

    [...el.childNodes].forEach(node=>{
      if(node.nodeType===Node.TEXT_NODE&&/[↗↘↙↖↑↓→←⟶⟵]/.test(node.nodeValue||'')){
        node.nodeValue=(node.nodeValue||'').replace(/[↗↘↙↖↑↓→←⟶⟵]/g,'').replace(/\s{2,}/g,' ');
      }
    });
    el.querySelectorAll('b,span,i').forEach(child=>{
      if(arrowOnly(child.textContent)){
        child.classList.add('ms-glass-v26-arrow');
        child.setAttribute('aria-hidden','true');
      }
    });

    installShader(el);
  }

  function scan(root=document){
    if(root.matches?.(selector))apply(root);
    root.querySelectorAll?.(selector).forEach(apply);
  }

  scan();

  const observer=new MutationObserver(records=>{
    records.forEach(record=>record.addedNodes.forEach(node=>{
      if(node.nodeType===Node.ELEMENT_NODE)scan(node);
    }));
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  addEventListener('pagehide',()=>observer.disconnect(),{once:true});
})();