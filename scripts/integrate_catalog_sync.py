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
]
catalog_r2h = '<script type="module" src="./catalog-sync.js?v=20260909-r2h"></script>'
scroll_tag = '<script type="module" src="./scroll-reveal.js"></script>'
marker = '</body>'

if marker not in text:
    raise SystemExit('Missing </body> marker in wix-preview/index.html')

changed = False
if catalog_r2h not in text:
    replaced = False
    for old in reversed(catalog_versions):
        if old in text:
            text = text.replace(old, catalog_r2h, 1)
            replaced = True
            break
    if not replaced and catalog_plain in text:
        text = text.replace(catalog_plain, catalog_r2h, 1)
        replaced = True
    if not replaced:
        text = text.replace(marker, f'{catalog_r2h}\n{marker}', 1)
    changed = True

if scroll_tag not in text:
    text = text.replace(marker, f'{scroll_tag}\n{marker}', 1)
    changed = True

if changed:
    path.write_text(text, encoding='utf-8')
    print('Injected round 2h cache-busted Home runtime into preview.')
else:
    print('Round 2h Home runtime already integrated; no change.')
