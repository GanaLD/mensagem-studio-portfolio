from pathlib import Path
import re, shutil, zipfile

repo = Path(__file__).resolve().parents[1]
zip_path = repo / 'CYBER_ANGEL_SCROLL_MODEL.zip'
asset_dir = repo / 'wix-preview' / 'assets'
asset_dir.mkdir(parents=True, exist_ok=True)
tmp = repo / '.tmp-cyber-angel'
if tmp.exists(): shutil.rmtree(tmp)
tmp.mkdir()
with zipfile.ZipFile(zip_path) as z:
    z.extractall(tmp)
child = (tmp / 'index.html').read_text(encoding='utf-8')

child = child.replace('html, body { margin: 0; padding: 0; overflow-x: hidden; background: #06090d; }',
                      'html, body { margin: 0; padding: 0; width:100%; height:100%; overflow:hidden; background:#06090d; }')
child = child.replace('.scroll-space { height: var(--pageH); }', '.scroll-space { display:none; }')
child = child.replace('position: fixed; inset: 0; overflow: hidden;', 'position: absolute; inset: 0; overflow: hidden;', 1)
child = child.replace('height: 132vh; width: auto; max-width: none;',
                      'height: max(132vh, calc(100vw * 1.777)); width: auto; max-width: none;')
child = child.replace('.bg { height: 146vh; }', '.bg { height: max(146vh, calc(100vw * 1.777)); }')
child = child.replace('  .hint {', '  .hint { display:none !important;')
child = child.replace('  .progress {', '  .progress { display:none !important;')
child = child.replace('  let progress = 0;', '  let progress = 0;\n  let externalProgress = 0;')
child = child.replace('progress = clamp(window.scrollY / maxScroll, 0, 1);',
                      'progress = clamp(externalProgress, 0, 1);')
child = child.replace("  window.addEventListener('scroll', render, { passive: true });", '')
child = child.replace("  updateMetrics();\n  (function loop() { render(); requestAnimationFrame(loop); })();",
'''  window.addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.type === 'cyber-angel-progress') {
      externalProgress = clamp(Number(data.progress) || 0, 0, 1);
      render();
    }
  });
  updateMetrics();
  (function loop() { render(); requestAnimationFrame(loop); })();''')
(asset_dir / 'cyber-angel-bg.html').write_text(child, encoding='utf-8')

index_path = repo / 'wix-preview' / 'index.html'
html = index_path.read_text(encoding='utf-8')
css = re.search(r'#sfGlobalMediaCanvas\{.*?\.after-word \.wrap\{position:relative;z-index:2\}', html, re.S)
if not css:
    raise SystemExit('global background CSS block not found')
css_new = '#sfGlobalMediaCanvas{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;opacity:var(--gmc-alpha);transition:opacity .22s linear;will-change:opacity;background:#06090d}#sfGlobalMediaCanvas:after{content:"";position:absolute;inset:0;z-index:5;background:linear-gradient(180deg,rgba(4,6,8,.12),rgba(4,6,8,.015) 38%,rgba(4,6,8,.16));pointer-events:none}#cyberAngelSlot{position:absolute;inset:0;z-index:1;overflow:hidden;pointer-events:none}#cyberAngelSlot iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#06090d;pointer-events:none}.content-layer{position:relative;z-index:1}.after-word{position:relative;z-index:1;background:transparent}.after-word>.section,.after-word>.final-cta,.after-word>footer{background:transparent}.after-word .wrap{position:relative;z-index:2}'
html = html[:css.start()] + css_new + html[css.end():]
canvas = re.search(r'<div id="sfGlobalMediaCanvas".*?</div></div>', html, re.S)
if not canvas:
    raise SystemExit('global canvas markup not found')
canvas_new = '<div id="sfGlobalMediaCanvas" aria-hidden="true"><div id="cyberAngelSlot" data-asset="cyber-angel-scroll"><iframe id="cyberAngelBg" src="./assets/cyber-angel-bg.html" title="Cyber Angel global scroll background" tabindex="-1" loading="eager"></iframe></div></div>'
html = html[:canvas.start()] + canvas_new + html[canvas.end():]
old_const = "gmc=document.querySelector('#sfGlobalMediaCanvas'),gmc1=document.querySelector('#gmcWord1'),gmc2=document.querySelector('#gmcWord2'),gmc3=document.querySelector('#gmcWord3'),imperial=document.querySelector('#imperialEstateBg');"
new_const = "gmc=document.querySelector('#sfGlobalMediaCanvas'),cyberAngel=document.querySelector('#cyberAngelBg');"
if old_const not in html:
    raise SystemExit('global canvas const declaration not found')
html = html.replace(old_const, new_const, 1)
fn = re.search(r'function updateGlobalCanvas\(y\)\{.*?\}\nfunction renderScroll', html, re.S)
if not fn:
    raise SystemExit('updateGlobalCanvas function not found')
new_fn = "function updateGlobalCanvas(y){const start=afterWord.offsetTop-innerHeight*.08,end=Math.max(start+1,document.documentElement.scrollHeight-innerHeight);const reveal=clamp((y-start)/(innerHeight*.34));const p=clamp((y-start)/(end-start));document.documentElement.style.setProperty('--gmc-alpha',String(reveal));if(cyberAngel&&cyberAngel.contentWindow){cyberAngel.contentWindow.postMessage({type:'cyber-angel-progress',progress:p},'*')}gmc.dataset.progress=p.toFixed(4);gmc.dataset.visible=reveal>.02?'true':'false'}\nfunction renderScroll"
html = html[:fn.start()] + new_fn + html[fn.end():]
needle = "addEventListener('pointermove',e=>{px=(e.clientX/Math.max(1,innerWidth)-.5)*2;py=(e.clientY/Math.max(1,innerHeight)-.5)*2;if(scrollY>afterWord.offsetTop-innerHeight)updateGlobalCanvas(scrollY)},{passive:true});"
html = html.replace(needle, "addEventListener('pointermove',e=>{px=(e.clientX/Math.max(1,innerWidth)-.5)*2;py=(e.clientY/Math.max(1,innerHeight)-.5)*2},{passive:true});", 1)
html = html.replace("video.addEventListener('loadedmetadata'", "cyberAngel&&cyberAngel.addEventListener('load',()=>updateGlobalCanvas(scrollY));\nvideo.addEventListener('loadedmetadata'", 1)
index_path.write_text(html, encoding='utf-8')
print('Cyber Angel background integrated')
print((asset_dir / 'cyber-angel-bg.html').stat().st_size)
