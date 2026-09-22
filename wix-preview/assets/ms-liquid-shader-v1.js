(()=>{
  if(window.__MS_LIQUID_SHADER_V2__) return;
  window.__MS_LIQUID_SHADER_V2__=true;

  const MAX_DPR=1.35;
  const states=new Map();
  const imageCache=new Map();
  const startedAt=performance.now();
  let lastFrame=0;

  const vertexSource=`
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  /* EXACT supplied fragment-shader math/constants.
     Integration change is outside the shader: each element is rendered to a square
     internal buffer and then stretched by CSS to the existing button/card geometry. */
  const fragmentSource=`
    precision mediump float;

    uniform vec3 iResolution;
    uniform float iTime;
    uniform vec4 iMouse;
    uniform sampler2D iChannel0;

    void mainImage(out vec4 fragColor, in vec2 fragCoord)
    {
      const float NUM_ZERO = 0.0;
      const float NUM_ONE = 1.0;
      const float NUM_HALF = 0.5;
      const float NUM_TWO = 2.0;
      const float POWER_EXPONENT = 6.0;
      const float MASK_MULTIPLIER_1 = 10000.0;
      const float MASK_MULTIPLIER_2 = 9500.0;
      const float MASK_MULTIPLIER_3 = 11000.0;
      const float LENS_MULTIPLIER = 5000.0;
      const float MASK_STRENGTH_1 = 8.0;
      const float MASK_STRENGTH_2 = 16.0;
      const float MASK_STRENGTH_3 = 2.0;
      const float MASK_THRESHOLD_1 = 0.95;
      const float MASK_THRESHOLD_2 = 0.9;
      const float MASK_THRESHOLD_3 = 1.5;
      const float SAMPLE_RANGE = 4.0;
      const float SAMPLE_OFFSET = 0.5;
      const float GRADIENT_RANGE = 0.2;
      const float GRADIENT_OFFSET = 0.1;
      const float GRADIENT_EXTREME = -1000.0;
      const float LIGHTING_INTENSITY = 0.3;

      vec2 uv = fragCoord / iResolution.xy;
      vec2 mouse = iMouse.xy;
      if (length(mouse) < NUM_ONE) {
        mouse = iResolution.xy / NUM_TWO;
      }
      vec2 m2 = (uv - mouse / iResolution.xy);

      float roundedBox = pow(abs(m2.x * iResolution.x / iResolution.y), POWER_EXPONENT) + pow(abs(m2.y), POWER_EXPONENT);
      float rb1 = clamp((NUM_ONE - roundedBox * MASK_MULTIPLIER_1) * MASK_STRENGTH_1, NUM_ZERO, NUM_ONE);
      float rb2 = clamp((MASK_THRESHOLD_1 - roundedBox * MASK_MULTIPLIER_2) * MASK_STRENGTH_2, NUM_ZERO, NUM_ONE) -
        clamp(pow(MASK_THRESHOLD_2 - roundedBox * MASK_MULTIPLIER_2, NUM_ONE) * MASK_STRENGTH_2, NUM_ZERO, NUM_ONE);
      float rb3 = clamp((MASK_THRESHOLD_3 - roundedBox * MASK_MULTIPLIER_3) * MASK_STRENGTH_3, NUM_ZERO, NUM_ONE) -
        clamp(pow(NUM_ONE - roundedBox * MASK_MULTIPLIER_3, NUM_ONE) * MASK_STRENGTH_3, NUM_ZERO, NUM_ONE);

      fragColor = vec4(NUM_ZERO);
      float transition = smoothstep(NUM_ZERO, NUM_ONE, rb1 + rb2);

      if (transition > NUM_ZERO) {
        vec2 lens = ((uv - NUM_HALF) * NUM_ONE * (NUM_ONE - roundedBox * LENS_MULTIPLIER) + NUM_HALF);
        float total = NUM_ZERO;
        for (float x = -SAMPLE_RANGE; x <= SAMPLE_RANGE; x++) {
          for (float y = -SAMPLE_RANGE; y <= SAMPLE_RANGE; y++) {
            vec2 offset = vec2(x, y) * SAMPLE_OFFSET / iResolution.xy;
            fragColor += texture2D(iChannel0, offset + lens);
            total += NUM_ONE;
          }
        }
        fragColor /= total;

        float gradient = clamp((clamp(m2.y, NUM_ZERO, GRADIENT_RANGE) + GRADIENT_OFFSET) / NUM_TWO, NUM_ZERO, NUM_ONE) +
          clamp((clamp(-m2.y, GRADIENT_EXTREME, GRADIENT_RANGE) * rb3 + GRADIENT_OFFSET) / NUM_TWO, NUM_ZERO, NUM_ONE);
        vec4 lighting = clamp(fragColor + vec4(rb1) * gradient + vec4(rb2) * LIGHTING_INTENSITY, NUM_ZERO, NUM_ONE);

        fragColor = mix(texture2D(iChannel0, uv), lighting, transition);
      } else {
        fragColor = texture2D(iChannel0, uv);
      }
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `;

  function createShader(gl,type,source){
    const shader=gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
      console.error('[MS Liquid Shader] shader error:',gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(gl){
    const vs=createShader(gl,gl.VERTEX_SHADER,vertexSource);
    const fs=createShader(gl,gl.FRAGMENT_SHADER,fragmentSource);
    if(!vs||!fs)return null;
    const program=gl.createProgram();
    gl.attachShader(program,vs);
    gl.attachShader(program,fs);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
      console.error('[MS Liquid Shader] program error:',gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }

  function isTransparent(color){
    return !color||color==='transparent'||/rgba\([^)]*,\s*0(?:\.0+)?\s*\)/i.test(color);
  }

  function backdropColor(el){
    let node=el?.parentElement;
    while(node&&node!==document.documentElement){
      const color=getComputedStyle(node).backgroundColor;
      if(!isTransparent(color))return color;
      node=node.parentElement;
    }
    return '#070806';
  }

  function backgroundUrl(value){
    if(!value||value==='none')return null;
    const match=value.match(/url\((['"]?)(.*?)\1\)/);
    return match?match[2]:null;
  }

  function loadImage(url){
    if(!url)return Promise.resolve(null);
    if(imageCache.has(url))return imageCache.get(url);
    const p=new Promise(resolve=>{
      const img=new Image();
      img.crossOrigin='anonymous';
      img.onload=()=>resolve(img);
      img.onerror=()=>resolve(null);
      img.src=url;
    });
    imageCache.set(url,p);
    return p;
  }

  function findBackdrop(el){
    const r=el.getBoundingClientRect();
    const x=Math.max(0,Math.min(innerWidth-1,r.left+r.width/2));
    const y=Math.max(0,Math.min(innerHeight-1,r.top+r.height/2));
    const stack=document.elementsFromPoint(x,y);

    for(const node of stack){
      if(node===el||el.contains(node))continue;
      if(node.classList?.contains('ms-liquid-shader-canvas'))continue;
      if(node instanceof HTMLVideoElement||node instanceof HTMLImageElement||node instanceof HTMLCanvasElement){
        return {kind:'media',node};
      }
      const url=backgroundUrl(getComputedStyle(node).backgroundImage);
      if(url)return {kind:'image',node,url};
    }
    return null;
  }

  function mediaDimensions(media){
    if(media instanceof HTMLVideoElement)return [media.videoWidth,media.videoHeight];
    if(media instanceof HTMLImageElement)return [media.naturalWidth,media.naturalHeight];
    if(media instanceof HTMLCanvasElement)return [media.width,media.height];
    return [0,0];
  }

  function drawBackdropCrop(ctx,media,mediaRect,targetRect,size){
    const [sw,sh]=mediaDimensions(media);
    if(!sw||!sh)return false;

    const style=getComputedStyle(media);
    const fit=(style.objectFit||'fill').trim();
    let scaleX=mediaRect.width/sw;
    let scaleY=mediaRect.height/sh;
    let offsetX=mediaRect.left;
    let offsetY=mediaRect.top;

    if(fit==='cover'||fit==='contain'){
      const scale=fit==='cover'?Math.max(scaleX,scaleY):Math.min(scaleX,scaleY);
      const renderW=sw*scale;
      const renderH=sh*scale;
      scaleX=scaleY=scale;
      offsetX=mediaRect.left+(mediaRect.width-renderW)/2;
      offsetY=mediaRect.top+(mediaRect.height-renderH)/2;
    }

    let sx=(targetRect.left-offsetX)/scaleX;
    let sy=(targetRect.top-offsetY)/scaleY;
    let sWidth=targetRect.width/scaleX;
    let sHeight=targetRect.height/scaleY;

    if(sx<0){sWidth+=sx;sx=0}
    if(sy<0){sHeight+=sy;sy=0}
    sWidth=Math.min(sw-sx,sWidth);
    sHeight=Math.min(sh-sy,sHeight);
    if(sWidth<=0||sHeight<=0)return false;

    try{
      ctx.drawImage(media,sx,sy,sWidth,sHeight,0,0,size,size);
      return true;
    }catch(_){
      return false;
    }
  }

  async function paintSource(state){
    const rect=state.el.getBoundingClientRect();
    const size=state.sourceCanvas.width;
    const ctx=state.sourceCtx;
    ctx.clearRect(0,0,size,size);

    const source=findBackdrop(state.el);

    if(source?.kind==='media'){
      if(drawBackdropCrop(ctx,source.node,source.node.getBoundingClientRect(),rect,size)){
        state.dynamic=source.node instanceof HTMLVideoElement||source.node instanceof HTMLCanvasElement;
        return;
      }
    }

    if(source?.kind==='image'){
      const img=await loadImage(source.url);
      if(img&&drawBackdropCrop(ctx,img,source.node.getBoundingClientRect(),rect,size)){
        state.dynamic=false;
        return;
      }
    }

    ctx.fillStyle=backdropColor(state.el);
    ctx.fillRect(0,0,size,size);
    state.dynamic=false;
  }

  function resize(state){
    const rect=state.el.getBoundingClientRect();
    if(rect.width<2||rect.height<2)return false;
    const dpr=Math.min(devicePixelRatio||1,MAX_DPR);

    /* Square internal buffer is deliberate: it keeps the supplied shader math exact.
       CSS stretches that shader result back to the existing element geometry. */
    const cssSize=Math.max(rect.width,rect.height);
    const size=Math.max(32,Math.min(512,Math.round(cssSize*dpr)));

    if(state.canvas.width!==size||state.canvas.height!==size){
      state.canvas.width=size;
      state.canvas.height=size;
      state.sourceCanvas.width=size;
      state.sourceCanvas.height=size;
      state.mouse=[size/2,size/2];
      state.dirty=true;
    }
    return true;
  }

  function uploadTexture(state){
    const {gl,texture,sourceCanvas}=state;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
    try{
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,sourceCanvas);
      return true;
    }catch(_){
      return false;
    }
  }

  async function renderState(state,now){
    if(!state.visible||!resize(state))return;

    if(state.dirty||state.dynamic||now-state.lastSource>100){
      state.lastSource=now;
      await paintSource(state);
      state.dirty=false;
    }

    if(!uploadTexture(state))return;

    const {gl,program,canvas}=state;
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.uniform3f(state.uniforms.resolution,canvas.width,canvas.height,1.0);
    gl.uniform1f(state.uniforms.time,(now-startedAt)/1000);
    gl.uniform4f(state.uniforms.mouse,state.mouse[0],state.mouse[1],0,0);
    gl.uniform1i(state.uniforms.texture,0);

    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  }

  function mount(el,isCard=false){
    if(!el||states.has(el))return;
    if(el.closest('#msSectionNav,#ms-rubber-topnav-root,.rubber-segment'))return;

    const canvas=document.createElement('canvas');
    canvas.className='ms-liquid-shader-canvas';
    canvas.setAttribute('aria-hidden','true');
    el.prepend(canvas);

    if(isCard)el.classList.add('ms-liquid-shader-card');
    else el.classList.add('ms-liquid-shader');

    const gl=canvas.getContext('webgl',{
      alpha:true,
      antialias:true,
      premultipliedAlpha:false,
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

    const position=gl.getAttribLocation(program,'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);

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
      uniforms:{
        resolution:gl.getUniformLocation(program,'iResolution'),
        time:gl.getUniformLocation(program,'iTime'),
        mouse:gl.getUniformLocation(program,'iMouse'),
        texture:gl.getUniformLocation(program,'iChannel0')
      },
      mouse:[0,0],
      visible:true,
      dynamic:false,
      dirty:true,
      lastSource:0
    };

    states.set(el,state);

    const ro=new ResizeObserver(()=>{state.dirty=true});
    ro.observe(el);
    state.ro=ro;

    const move=event=>{
      if(!resize(state))return;
      const rect=el.getBoundingClientRect();
      const size=state.canvas.width;
      const x=((event.clientX-rect.left)/Math.max(1,rect.width))*size;
      const y=(1-((event.clientY-rect.top)/Math.max(1,rect.height)))*size;
      state.mouse=[
        Math.max(0,Math.min(size,x)),
        Math.max(0,Math.min(size,y))
      ];
    };
    const center=()=>{
      const size=state.canvas.width||64;
      state.mouse=[size/2,size/2];
    };
    el.addEventListener('pointermove',move,{passive:true});
    el.addEventListener('pointerleave',center,{passive:true});
    state.cleanupPointer=()=>{
      el.removeEventListener('pointermove',move);
      el.removeEventListener('pointerleave',center);
    };
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
      state.cleanupPointer?.();
      try{state.gl.getExtension('WEBGL_lose_context')?.loseContext()}catch(_){}
    }
    states.clear();
  },{once:true});
})();