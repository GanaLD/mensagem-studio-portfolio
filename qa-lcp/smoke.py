import json
import pathlib
import re
import subprocess
import sys
import time
import traceback
from urllib.parse import urlsplit, parse_qs

from PIL import Image, ImageChops, ImageStat
from playwright.sync_api import sync_playwright

AREA = sys.argv[1]
PREFIX = '/wix-preview/' if AREA == 'preview' else '/'
OUT = pathlib.Path('evidence') / AREA
OUT.mkdir(parents=True, exist_ok=True)
BASE = 'https://mensagemstudio.shop'
ORIGINAL = 'c6cfdd8ec7db02a313f0e5cf252e1463008ee91f'
rows = []

def old_html(slug):
    path = PREFIX.lstrip('/') + slug + 'index.html'
    return subprocess.check_output(['git', '-C', 'site', 'show', ORIGINAL + ':' + path])

with sync_playwright() as pw:
    browser = pw.chromium.launch(channel='chrome', args=['--no-sandbox'])
    for width in [1920]:
        for slug in ['']:
            phases = ['before', 'after'] if AREA == 'preview' else ['after']
            for phase in phases:
                row = dict(width=width, slug=slug or 'home', phase=phase)
                rows.append(row)
                ctx = browser.new_context(viewport={'width': width, 'height': 900 if width > 800 else 800})
                ctx.route(re.compile(r'googletagmanager\.com|google-analytics\.com'), lambda r: r.abort())
                page = ctx.new_page()
                page.set_default_timeout(15000)
                errors = []
                page.on('pageerror', lambda e: errors.append(str(e)[:200]))
                url = BASE + PREFIX + slug
                if phase == 'before':
                    original = old_html(slug)
                    page.route(url, lambda r: r.fulfill(body=original, content_type='text/html; charset=utf-8'))
                try:
                    res = page.goto(url, wait_until='domcontentloaded', timeout=90000)
                    assert res.status == 200
                    expected = subprocess.check_output(['git','-C','site','show','6b65f83baa55bca5fbdc9c38efa4c9af4591b0d2:'+PREFIX.lstrip('/')+slug+'index.html'])
                    assert res.body() == expected, 'HTTP body differs from published commit'
                    row['verifiedCommit'] = '6b65f83baa55bca5fbdc9c38efa4c9af4591b0d2'
                    page.evaluate('document.fonts.ready')
                    if not slug:
                        page.wait_for_function('window.MSCenaHero?.ready', timeout=90000)
                    page.wait_for_timeout(800)
                    row['scrollWidth'] = page.evaluate('document.documentElement.scrollWidth')
                    assert row['scrollWidth'] <= width + 1
                    row['layout'] = page.locator('.hero-copy' if slug else '#msUnifiedHeroStage').evaluate("""e=>[...e.querySelectorAll('h1,p.lead,.cue-label')].filter(n=>n.getBoundingClientRect().width).map(n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return [n.textContent.trim(),s.fontFamily,s.fontSize,...[r.x,r.y,r.width,r.height].map(Math.round)]})""")
                    page.screenshot(path=str(OUT / f'{phase}-{width}-{slug.strip("/") or "home"}.png'), timeout=40000)
                    if not slug:
                        page.evaluate("scrollTo({top:document.querySelector('#cenaHero1').offsetTop+300,behavior:'instant'})")
                        page.wait_for_function('window.MSCenaHero.metrics().progress>0')
                        row['heroProgress'] = page.evaluate('window.MSCenaHero.metrics().progress')
                        sound = page.locator('.ms-sound-toggle').first
                        states = []
                        for _ in range(4):
                            box = sound.bounding_box()
                            assert box
                            x, y = box['x'] + box['width']/2, box['y'] + box['height']/2
                            assert page.evaluate("([x,y])=>Boolean(document.elementFromPoint(x,y)?.closest('.ms-sound-toggle'))", [x,y])
                            page.mouse.click(x,y)
                            page.wait_for_timeout(500)
                            states.append(sound.get_attribute('aria-label'))
                        row['audioStates'] = states
                        row['audioToggleVerified'] = len(set(states)) > 1
                        page.locator('.ms-sound-more').first.click()
                        assert page.locator('.ms-sound-panel').get_attribute('aria-hidden') == 'false'
                        page.keyboard.press('Escape')
                        page.locator('#pdfMenuToggle').press('ArrowDown')
                        assert not page.locator('#pdfTabs').evaluate('e=>e.inert')
                        tabs = page.locator('#pdfTabs button')
                        if tabs.count() > 1:
                            tabs.nth(1).press('Enter')
                        assert page.locator('a[href*="wa.me/"],a[href*="whatsapp.com"]').count()
                    else:
                        wa = page.locator('a[href*="wa.me/"][href*="text="]').first
                        assert parse_qs(urlsplit(wa.get_attribute('href')).query).get('text')
                        if slug == 'video-ia/':
                            v = page.locator('video[controls]').first
                            v.evaluate('v=>{v.muted=true;return v.play()}')
                            page.wait_for_function('document.querySelector("video[controls]").currentTime>0')
                            v.evaluate('v=>v.pause()')
                            cards = page.locator('.case-media video')
                            assert cards.count() == 4
                            last = cards.last
                            last.scroll_into_view_if_needed()
                            assert all(cards.evaluate_all('vs=>vs.map(v=>v.poster)'))
                            last.evaluate('v=>{v.muted=true;return v.play()}')
                            page.wait_for_function("document.querySelectorAll('.case-media video')[3].currentTime>0")
                            last.evaluate('v=>v.pause()')
                        else:
                            demo = page.locator('.demo-frame').first
                            demo.scroll_into_view_if_needed()
                            demo.locator(':scope > iframe').wait_for(state='visible')
                            assert demo.locator('iframe').first.get_attribute('src')
                        faq = page.locator('details > summary').first
                        faq.click()
                        assert faq.evaluate('e=>e.parentNode.open')
                    row['ok'] = True
                except Exception:
                    row['error'] = traceback.format_exc()[-900:]
                finally:
                    row['pageErrors'] = errors
                    ctx.close()
                    (OUT / 'qa.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2))
                    print(json.dumps({k:v for k,v in row.items() if k != 'layout'}, ensure_ascii=False), flush=True)
    browser.close()

if AREA == 'preview':
    diff = []
    for width in [1920, 1366, 768, 390, 360]:
        for slug in ['home', 'video-ia', 'landing-pages']:
            a, b = [OUT / f'{p}-{width}-{slug}.png' for p in ['before', 'after']]
            if a.exists() and b.exists():
                error = ImageStat.Stat(ImageChops.difference(Image.open(a).convert('RGB'), Image.open(b).convert('RGB'))).mean
                pair = [r for r in rows if r['width'] == width and r['slug'].strip('/') == slug]
                diff.append(dict(width=width, page=slug, mean_pixel_error_255=sum(error)/3, geometry_equal=pair[0]['layout']==pair[1]['layout']))
    (OUT / 'visual-diff.json').write_text(json.dumps(diff, indent=2))
assert all(r.get('ok') for r in rows), 'See qa.json for failed checks'
