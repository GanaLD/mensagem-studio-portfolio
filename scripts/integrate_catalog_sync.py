from pathlib import Path

path = Path('wix-preview/index.html')
text = path.read_text(encoding='utf-8')

catalog_old = '<script type="module" src="./catalog-sync.js"></script>'
catalog_new = '<script type="module" src="./catalog-sync.js?v=20260909-r2b"></script>'
scroll_tag = '<script type="module" src="./scroll-reveal.js"></script>'
marker = '</body>'

if marker not in text:
    raise SystemExit('Missing </body> marker in wix-preview/index.html')

changed = False
if catalog_new not in text:
    if catalog_old in text:
        text = text.replace(catalog_old, catalog_new, 1)
    else:
        text = text.replace(marker, f'{catalog_new}\n{marker}', 1)
    changed = True

if scroll_tag not in text:
    text = text.replace(marker, f'{scroll_tag}\n{marker}', 1)
    changed = True

if changed:
    path.write_text(text, encoding='utf-8')
    print('Injected cache-busted Home runtime into preview.')
else:
    print('Cache-busted Home runtime already integrated; no change.')
