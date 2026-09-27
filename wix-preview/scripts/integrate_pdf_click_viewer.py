from pathlib import Path

path = Path('wix-preview/index.html')
text = path.read_text(encoding='utf-8')
marker = '<script type="module" src="./pdf-click-viewer.js"></script>'

if marker not in text:
    text = text.replace('</body>', marker + '\n</body>')

path.write_text(text, encoding='utf-8')
print('PDF click viewer integrated:', marker in text)
