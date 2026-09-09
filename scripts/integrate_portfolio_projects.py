from pathlib import Path

path = Path('wix-preview/portfolio/index.html')
text = path.read_text(encoding='utf-8')
marker = '</body>'
tags = [
    '<script src="./project-data.js"></script>',
    '<script src="./portfolio-linker.js"></script>',
]
if marker not in text:
    raise SystemExit('Missing </body> in portfolio index')
missing = [tag for tag in tags if tag not in text]
if missing:
    text = text.replace(marker, '\n'.join(missing) + '\n' + marker, 1)
    path.write_text(text, encoding='utf-8')
    print('Integrated project data and card links into Portfolio page.')
else:
    print('Portfolio project links already integrated.')
