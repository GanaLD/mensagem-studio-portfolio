from pathlib import Path

path = Path('wix-preview/index.html')
text = path.read_text(encoding='utf-8')

catalog_plain = '<script type="module" src="./catalog-sync.js"></script>'
catalog_versions = [
    '<script type="module" src="./catalog-sync.js?v=20260909-r2b"></script>',
    '<script type="module" src="./catalog-sync.js?v=20260909-r2c"></script>',
    '<script type="module" src="./catalog-sync.js?v=20260909-r2d"></script>',
    '<script type="module" src="./catalog-sync.js?v=20260909-r2e"></script>',
    '<script type="module" src="./catalog-sync.js?v=20260909-r2f"></script>',
    '<script type="module" src="./catalog-sync.js?v=20260909-r2g"></script>',
    '<script type="module" src="./catalog-sync.js?v=20260909-r2h"></script>',
    '<script type="module" src="./catalog-sync.js?v=20260909-r2i"></script>',
    '<script type="module" src="./catalog-sync.js?v=20260910-r2j"></script>',
]
catalog_current = '<script type="module" src="./catalog-sync.js?v=20260910-r2k"></script>'
scroll_plain = '<script type="module" src="./scroll-reveal.js"></script>'
scroll_old = '<script type="module" src="./scroll-reveal.js?v=20260910-brief-fix"></script>'
scroll_current = '<script type="module" src="./scroll-reveal.js?v=20260910-brief-crisp"></script>'
marker = '</body>'

if marker not in text:
    raise SystemExit('Missing </body> marker in wix-preview/index.html')

changed = False
if catalog_current not in text:
    replaced = False
    for old in reversed(catalog_versions):
        if old in text:
            text = text.replace(old, catalog_current, 1)
            replaced = True
            break
    if not replaced and catalog_plain in text:
        text = text.replace(catalog_plain, catalog_current, 1)
        replaced = True
    if not replaced:
        text = text.replace(marker, f'{catalog_current}\n{marker}', 1)
    changed = True

if scroll_current not in text:
    if scroll_old in text:
        text = text.replace(scroll_old, scroll_current, 1)
    elif scroll_plain in text:
        text = text.replace(scroll_plain, scroll_current, 1)
    else:
        text = text.replace(marker, f'{scroll_current}\n{marker}', 1)
    changed = True

old_scrub = "function scrubLoop(){if(videoReady){const delta=targetVideoTime-smoothVideoTime;smoothVideoTime+=delta*.115;if(Math.abs(video.currentTime-smoothVideoTime)>.014&&!video.seeking){try{video.currentTime=smoothVideoTime}catch(e){}}}requestAnimationFrame(scrubLoop)}"
new_scrub = "function scrubLoop(){if(videoReady){const mobile=innerWidth<=760,delta=targetVideoTime-smoothVideoTime;smoothVideoTime+=delta*(mobile?.34:.115);const seekGate=mobile?.006:.014;if(Math.abs(video.currentTime-smoothVideoTime)>seekGate&&!video.seeking){try{video.currentTime=smoothVideoTime}catch(e){}}}requestAnimationFrame(scrubLoop)}"
if old_scrub in text:
    text = text.replace(old_scrub, new_scrub, 1)
    changed = True
elif new_scrub not in text:
    raise SystemExit('Hero scrub signature not found; refusing to patch blindly.')

if changed:
    path.write_text(text, encoding='utf-8')
    print('Injected round 2k mobile Hero scroll tuning and cache-busted runtime.')
else:
    print('Round 2k mobile Hero scroll tuning already integrated; no change.')
