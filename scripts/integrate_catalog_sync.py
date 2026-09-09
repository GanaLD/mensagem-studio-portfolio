from pathlib import Path

path = Path('wix-preview/index.html')
text = path.read_text(encoding='utf-8')
tags = [
    '<script type="module" src="./catalog-sync.js"></script>',
    '<script type="module" src="./scroll-reveal.js"></script>',
]

marker = '</body>'
if marker not in text:
    raise SystemExit('Missing </body> marker in wix-preview/index.html')

changed = False
for tag in tags:
    if tag not in text:
        text = text.replace(marker, f'{tag}\n{marker}', 1)
        changed = True

if changed:
    path.write_text(text, encoding='utf-8')
    print('Injected missing Home runtime scripts into preview.')
else:
    print('Home runtime scripts already integrated; no change.')
