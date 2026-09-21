(()=>{
  if(window.__MS_LIQUID_SHADER_V1__) return;
  window.__MS_LIQUID_SHADER_V1__=true;

  const MAX_DPR=1.5;
  const states=new Map();
  const imageCache=new Map();
  let lastFrame=0;

  const vertexSource=`
    attribute vec2 position;
    void main(){
      gl_Position=vec4(position,0.0,1.0);
    }
  `;

  const fragmentSource=`
    precision mediump float;

    uniform vec2 iResolution;
    uniform sampler2D iChannel0;

    void main(){
      const float NUM_ZERO=0.0;
      const float NUM_ONE=1.0;
      const float NUM_HALF=0.5;
      const float POWER_EXPONENT=6.0;

      const float MASK_MULTIPLIER_1=88.0;
      const float MASK_MULTIPLIER_2=82.0;
      const float MASK_MULTIPLIER_3=96.0;
      const float LENS_MULTIPLIER=46.0;

      const float MASK_STRENGTH_1=8.0;
      const float MASK_STRENGTH_2=16.0;
      const float MASK_STRENGTH_3=2.0;
      const float MASK_THRESHOLD_1=0.95;
      const float MASK_THRESHOLD_2=0.90;
      const float MASK_THRESHOLD_3=1.50;

      const float SAMPLE_RANGE=4.0;
      const float SAMPLE_OFFSET=0.50;
      const float GRADIENT_RANGE=0.20;
      const float GRADIENT_OFFSET=0.10;
      const float GRADIENT_EXTREME=-1000.0;
      const float LIGHTING_INTENSITY=0.30;

      vec2 uv=gl_FragCoord.xy/iResolution.xy;
      vec2 m2=uv-vec2(NUM_HALF);

      float roundedBox=
        pow(abs(m2.x),POWER_EXPONENT)+
        pow(abs(m2.y),POWER_EXPONENT);

      float rb1=clamp((NUM_ONE-roundedBox*MASK_MULTIPLIER_1)*MASK_STRENGTH_1,NUM_ZERO,NUM_ONE);
      float rb2=
        clamp((MASK_THRESHOLD_1-roundedBox*MASK_MULTIPLIER_2)*MASK_STRENGTH_2,NUM_ZERO,NUM_ONE)-
        clamp(pow(MASK_THRESHOLD_2-roundedBox*MASK_MULTIPLIER_2,NUM_ONE)*MASK_STRENGTH_2,NUM_ZERO,NUM_ONE);
      float rb3=
        clamp((MASK_THRESHOLD_3-roundedBox*MASK_MULTIPLIER_3)*MASK_STRENGTH_3,NUM_ZERO,NUM_ONE)-
        clamp(pow(NUM_ONE-roundedBox*MASK_MULTIPLIER_3,NUM_ONE)*MASK_STRENGTH_3,NUM_ZERO,NUM_ONE);

      float transition=smoothstep(NUM_ZERO,NUM_ONE,rb1+rb2);
      vec4 base=texture2D(iChannel0,uv);
      vec4 fragColor=base;

      if(transition>NUM_ZERO){
        vec2 lens=((uv-NUM_HALF)*(NUM_ONE-roundedBox*LENS_MULTIPLIER)+NUM_HALF);
        lens=clamp(lens,vec2(0.001),vec2(0.999));

        vec4 sampled=vec4(NUM_ZERO);
        float total=NUM_ZERO;

        for(float x=-SAMPLE_RANGE;x<=SAMPLE_RANGE;x++){
          for(float y=-SAMPLE_RANGE;y<=SAMPLE_RANGE;y++){
            vec2 offset=vec2(x,y)*SAMPLE_OFFSET/iResolution.xy;
            sampled+=texture2D(iChannel0,clamp(offset+lens,vec2(0.001),vec2(0.999)));
            total+=NUM_ONE;
          }
        }
        sampled/=total;

        float gradient=
          clamp((clamp(m2.y,NUM_ZERO,GRADIENT_RANGE)+GRADIENT_OFFSET)/2.0,NUM_ZERO,NUM_ONE)+
          clamp((clamp(-m2.y,GRADIENT_EXTREME,GRADIENT_RANGE)*rb3+GRADIENT_OFFSET)/2.0,NUM_ZERO,NUM_ONE);

        vec4 lighting=clamp(sampled+vec4(rb1)*gradient+vec4(rb2)*LIGHTING_INTENSITY,NUM_ZERO,NUM_ONE);
        fragColor=mix(base,lighting,transition);
      }

      gl_FragColor=vec4(fragColor.rgb,0.92);
    }
  `;

  function makeShader(gl,type,source){
    const shader=gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
      console.error('[MS Liquid Shader] compile error',gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(gl){
    const vs=makeShader(gl,gl.VERTEX_SHADER,vertexSource);
    const fs=makeShader(gl,gl.FRAGMENT_SHADER,fragmentSource);
    if(!vs||!fs)return null;
    const program=gl.createProgram();
    gl.attachShader(program,vs);
    gl.attachShader(program,fs);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
      console.error('[MS Liquid Shader] link error',gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }

  function transparent(color){
    return !color||color==='transparent'||/rgba\([^)]*,\s*0(?:\.0+)?\s*\)/i.test(color);
  }

  function firstBackgroundColor(el){
    let node=el;
    while(node&&node!==document.documentElement){
      const c=getComputedStyle(node).backgroundColor;
      if(!transparent(c))return c;
      node=node.parentElement;
    }
    return '#080a0c';
  }

  function parseBgUrl(value){
    if(!value||value==='none')return null;
    const m=value.match(/url\((['"]?)(.*?)\1\)/);
    return m?m[2]:null;
  }

  function loadImage(url){
    if(!url)return Promise.resolve(null);
    if(imageCache.has(url))return imageCache.get(url);
    const promise=new Promise(resolve=>{
      const img=new Image();
      img.crossOrigin='anonymous';
      img.onload=()=>resolve(img);
      img.onerror=()=>resolve(null);
      img.src=url;
    });
    imageCache.set(url,promise);
    return promise;
  }

  function candidateBehind(el){
    const r=el.getBoundingClientRect();
    const x=Math.max(0,Math.min(innerWidth-1,r.left+r.width/2));
    const y=Math.max(0,Math.min(innerHeight-1,r.top+r.height/2));
    const stack=document.elementsFromPoint(x,y);

    for(const node of stack){
      if(node===el||el.contains(node))continue;
      if(node.classList?.contains('ms-liquid-shader-canvas'))continue;
      if(node.closest?.('.ms-glass-v26')===el)continue;
      if(node instanceof HTMLVideoElement||node instanceof HTMLImageElement||node instanceof HTMLCanvasElement){
        return {type:'media',node};
      }
      const bg=parseBgUrl(getComputedStyle(node).backgroundImage);
      if(bg)return {type:'background',node,url:bg};
    }
    return null;
  }

  function drawMediaCrop(ctx,media,mediaRect,targetRect,w,h){
    let sw,sh;
    if(media instanceof HTMLVideoElement){
      sw=media.videoWidth;sh=media.videoHeight;
      if(!sw||!sh)return false;
    }else if(media instanceof HTMLImageElement){
      sw=media.naturalWidth;sh=media.naturalHeight;
      if(!sw||!sh)return false;
    }else if(media instanceof HTMLCanvasElement){
      sw=media.width;sh=media.height;
      if(!sw||!sh)return false;
    }else return false;

    const style=getComputedStyle(media);
    const fit=(style.objectFit||'fill').trim();

    let scaleX=mediaRect.width/sw;
    let scaleY=mediaRect.height/sh;
    let scale=1;
    let renderW=mediaRect.width;
    let renderH=mediaRect.height;
    let offsetX=mediaRect.left;
    let offsetY=mediaRect.top;

    if(fit==='cover'||fit==='contain'){
      scale=fit==='cover'?Math.max(scaleX,scaleY):Math.min(scaleX,scaleY);
      renderW=sw*scale;
      renderH=sh*scale;
      offsetX=mediaRect.left+(mediaRect.width-renderW)/2;
      offsetY=mediaRect.top+(mediaRect.height-renderH)/2;
      scaleX=scaleY=scale;
    }

    let sx=(targetRect.left-offsetX)/scaleX;
    let sy=(targetRect.top-offsetY)/scaleY;
    let sWidth=targetRect.width/scaleX;
    let sHeight=targetRect.height/scaleY;

    sx=Math.max(0,sx);
    sy=Math.max(0,sy);
    sWidth=Math.min(sw-sx,sWidth);
    sHeight=Math.min(sh-sy,sHeight);
    if(sWidth<=0||sHeight<=0)return false;

    try{
      ctx.drawImage(media,sx,sy,sWidth,sHeight,0,0,w,h);
      return true;
    }catch(_){
      return false;
    }
  }

  async function paintSource(state){
    const {el,sourceCanvas,sourceCtx}=state;
    const rect=el.getBoundingClientRect();
    const w=sourceCanvas.width,h=sourceCanvas.height;
    sourceCtx.clearRect(0,0,w,h);

    const source=candidateBehind(el);

    if(source?.type==='media'){
      if(drawMediaCrop(sourceCtx,source.node,source.node.getBoundingClientRect(),rect,w,h)){
        state.dynamic=source.node instanceof HTMLVideoElement||source.node instanceof HTMLCanvasElement;
        return;
      }
    }

    if(source?.type==='background'){
      const img=await loadImage(source.url);
      if(img&&drawMediaCrop(sourceCtx,img,source.node.getBoundingClientRect(),rect,w,h)){
        state.dynamic=false;
        return;
      }
    }

    const color=firstBackgroundColor(el.parentElement||el);
    sourceCtx.fillStyle=color;
    sourceCtx.fillRect(0,0,w,h);
    const g=sourceCtx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'rgba(255,255,255,.02)');
    g.addColorStop(.38,'rgba(65,105,225,.10)');
    g.addColorStop(.62,'rgba(255,255,255,.06)');
    g.addColorStop(1,'rgba(201,255,54,.05)');
    sourceCtx.fillStyle=g;
    sourceCtx.fillRect(0,0,w,h);
    state.dynamic=false;
  }

  function resize(state){
    const rect=state.el.getBoundingClientRect();
    if(rect.width<2||rect.height<2)return false;
    const dpr=Math.min(devicePixelRatio||1,MAX_DPR);
    const w=Math.max(2,Math.round(rect.width*dpr));
    const h=Math.max(2,Math.round(rect.height*dpr));
    if(state.canvas.width!==w||state.canvas.height!==h){
      state.canvas.width=w;state.canvas.height=h;
      state.sourceCanvas.width=w;state.sourceCanvas.height=h;
      state.dirty=true;
    }
    return true;
  }

  async function renderState(state,now){
    if(!state.visible||!resize(state))return;
    if(state.dirty||state.dynamic||now-state.lastSource>120){
      state.lastSource=now;
      await paintSource(state);
      state.dirty=false;
    }

    const {gl,program,texture}=state;
    gl.viewport(0,0,state.canvas.width,state.canvas.height);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);

    try{
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,state.sourceCanvas);
    }catch(_){
      return;
    }

    gl.uniform2f(state.uResolution,state.canvas.width,state.canvas.height);
    gl.uniform1i(state.uTexture,0);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  }

  function mount(el,isCard=false){
    if(!el||states.has(el))return;
    if(el.closest('#msSectionNav,#ms-rubber-topnav-root,.rubber-segment'))return;

    const canvas=document.createElement('canvas');
    canvas.className='ms-liquid-shader-canvas';
    canvas.setAttribute('aria-hidden','true');

    if(isCard){
      el.classList.add('ms-liquid-shader-card');
      el.prepend(canvas);
    }else{
      el.classList.add('ms-liquid-shader');
      el.prepend(canvas);
    }

    const gl=canvas.getContext('webgl',{
      alpha:true,
      antialias:true,
      premultipliedAlpha:true,
      preserveDrawingBuffer:false
    });

    if(!gl){
      document.documentElement.classList.add('no-ms-liquid-webgl');
      canvas.remove();
      return;
    }

    const program=createProgram(gl);
    if(!program){
      document.documentElement.classList.add('no-ms-liquid-webgl');
      canvas.remove();
      return;
    }

    const buffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    const pos=gl.getAttribLocation(program,'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);

    const texture=gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);

    const sourceCanvas=document.createElement('canvas');
    const sourceCtx=sourceCanvas.getContext('2d',{alpha:false});

    const state={
      el,canvas,gl,program,buffer,texture,sourceCanvas,sourceCtx,
      uResolution:gl.getUniformLocation(program,'iResolution'),
      uTexture:gl.getUniformLocation(program,'iChannel0'),
      visible:true,dynamic:false,dirty:true,lastSource:0
    };
    states.set(el,state);

    const ro=new ResizeObserver(()=>{state.dirty=true});
    ro.observe(el);
    state.ro=ro;
  }

  function scan(root=document){
    root.querySelectorAll?.('.ms-glass-v26').forEach(el=>mount(el,false));
    root.querySelectorAll?.('#msServicesDeck .border-glow-inner').forEach(el=>mount(el,true));

    if(root.matches?.('.ms-glass-v26'))mount(root,false);
    if(root.matches?.('#msServicesDeck .border-glow-inner'))mount(root,true);
  }

  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const state=states.get(entry.target);
      if(state)state.visible=entry.isIntersecting;
    });
  },{threshold:0,rootMargin:'120px'});

  function observeNew(){
    for(const [el,state] of states){
      if(!state.ioBound){
        state.ioBound=true;
        io.observe(el);
      }
    }
  }

  scan();
  observeNew();

  const mo=new MutationObserver(records=>{
    records.forEach(record=>record.addedNodes.forEach(node=>{
      if(node.nodeType===Node.ELEMENT_NODE)scan(node);
    }));
    observeNew();
  });
  mo.observe(document.documentElement,{childList:true,subtree:true});

  addEventListener('scroll',()=>{
    for(const state of states.values())state.dirty=true;
  },{passive:true});
  addEventListener('resize',()=>{
    for(const state of states.values())state.dirty=true;
  },{passive:true});

  async function frame(now){
    if(now-lastFrame>=33){
      lastFrame=now;
      for(const state of states.values()){
        if(state.visible)await renderState(state,now);
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  addEventListener('pagehide',()=>{
    mo.disconnect();
    io.disconnect();
    for(const state of states.values()){
      state.ro?.disconnect();
      try{state.gl.getExtension('WEBGL_lose_context')?.loseContext()}catch(_){}
    }
    states.clear();
  },{once:true});
})();