from pathlib import Path
import re

HOME = Path('wix-preview/index.html')
GLOBAL_VERSION = '20260910-r3'
GLOBAL_HOME = f'<script src="./global-ui.js?v={GLOBAL_VERSION}"></script>'
GLOBAL_CHILD = f'<script src="../global-ui.js?v={GLOBAL_VERSION}"></script>'
GLOBAL_ABS = f'<script src="/wix-preview/global-ui.js?v={GLOBAL_VERSION}"></script>'
CART_SUGGEST = f'<script src="../services-cart-suggestions.js?v={GLOBAL_VERSION}"></script>'


def ensure_script(text: str, desired: str, pattern: str) -> tuple[str, bool]:
    if desired in text:
        return text, False
    match = re.search(pattern, text)
    if match:
        return text[:match.start()] + desired + text[match.end():], True
    marker = '</body>'
    if marker not in text:
        raise SystemExit('Missing </body> marker while integrating universal UI.')
    return text.replace(marker, desired + '\n' + marker, 1), True


def patch_home():
    path = HOME
    text = path.read_text(encoding='utf-8')
    marker = '</body>'
    if marker not in text:
        raise SystemExit('Missing </body> marker in wix-preview/index.html')

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

    text, c = ensure_script(text, GLOBAL_HOME, r'<script src="\./global-ui\.js\?v=[^"]+"></script>')
    changed |= c
    if changed:
        path.write_text(text, encoding='utf-8')
    return changed


def patch_page(path: Path, desired_scripts: list[tuple[str, str]]):
    text = path.read_text(encoding='utf-8')
    changed = False
    for desired, pattern in desired_scripts:
        text, c = ensure_script(text, desired, pattern)
        changed |= c
    if changed:
        path.write_text(text, encoding='utf-8')
    return changed


changed_files = []
if patch_home():
    changed_files.append(str(HOME))

portfolio_index = Path('wix-preview/portfolio/index.html')
if patch_page(portfolio_index, [(GLOBAL_CHILD, r'<script src="\.\./global-ui\.js\?v=[^"]+"></script>')]):
    changed_files.append(str(portfolio_index))

services_index = Path('wix-preview/servicos/index.html')
if patch_page(services_index, [
    (GLOBAL_CHILD, r'<script src="\.\./global-ui\.js\?v=[^"]+"></script>'),
    (CART_SUGGEST, r'<script src="\.\./services-cart-suggestions\.js\?v=[^"]+"></script>'),
]):
    changed_files.append(str(services_index))

for project_index in sorted(Path('wix-preview/portfolio').glob('*/index.html')):
    if patch_page(project_index, [(GLOBAL_ABS, r'<script src="/wix-preview/global-ui\.js\?v=[^"]+"></script>')]):
        changed_files.append(str(project_index))

print('Universal UI integration complete.')
if changed_files:
    print('Changed:')
    for p in changed_files:
        print(' -', p)
else:
    print('No generated changes required.')
