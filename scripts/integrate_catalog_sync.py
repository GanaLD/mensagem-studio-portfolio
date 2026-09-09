from pathlib import Path

path = Path('wix-preview/index.html')
text = path.read_text(encoding='utf-8')
tag = '<script type="module" src="./catalog-sync.js"></script>'

if tag not in text:
    marker = '</body>'
    if marker not in text:
        raise SystemExit('Missing </body> marker in wix-preview/index.html')
    text = text.replace(marker, f'{tag}\n{marker}', 1)
    path.write_text(text, encoding='utf-8')
    print('Injected catalog-sync.js into preview.')
else:
    print('catalog-sync.js already integrated; no change.')
