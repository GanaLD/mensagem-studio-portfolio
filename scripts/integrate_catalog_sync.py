from pathlib import Path

path = Path('wix-preview/index.html')
text = path.read_text(encoding='utf-8')

catalog_plain = '<script type="module" src="./catalog-sync.js"></script>'
catalog_r2b = '<script type="module" src="./catalog-sync.js?v=20260909-r2b"></script>'
catalog_r2c = '<script type="module" src="./catalog-sync.js?v=20260909-r2c"></script>'
catalog_r2d = '<script type="module" src="./catalog-sync.js?v=20260909-r2d"></script>'
scroll_tag = '<script type="module" src="./scroll-reveal.js"></script>'
marker = '</body>'

if marker not in text:
    raise SystemExit('Missing </body> marker in wix-preview/index.html')

changed = False
if catalog_r2d not in text:
    if catalog_r2c in text:
        text = text.replace(catalog_r2c, catalog_r2d, 1)
    elif catalog_r2b in text:
        text = text.replace(catalog_r2b, catalog_r2d, 1)
    elif catalog_plain in text:
        text = text.replace(catalog_plain, catalog_r2d, 1)
    else:
        text = text.replace(marker, f'{catalog_r2d}\n{marker}', 1)
    changed = True

if scroll_tag not in text:
    text = text.replace(marker, f'{scroll_tag}\n{marker}', 1)
    changed = True

if changed:
    path.write_text(text, encoding='utf-8')
    print('Injected round 2d cache-busted Home runtime into preview.')
else:
    print('Round 2d Home runtime already integrated; no change.')
