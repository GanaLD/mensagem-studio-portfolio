import asyncio, hashlib, json, pathlib, time, urllib.request
from concurrent.futures import ThreadPoolExecutor
from playwright.async_api import async_playwright

BASE = 'https://mensagemstudio.shop/'
SHA = 'c6cfdd8ec7db02a313f0e5cf252e1463008ee91f'
EXPECTED = {"index.html":"5f2735f87617ea56e136f12d4637142ff9e54402","servicos/index.html":"7148a9badbd6ea41e5c902f0c7fbefc80a61398d","landing-pages/index.html":"91c4d3864c181e7a51759a5bd17847dd11588db6","video-ia/index.html":"06d366b507d69f2191a09359ad656e1e8982db0a","llms.txt":"32f58c712c58b89b0b6d0b57d5135a1c3331061c","assets/projects-hologram-grid.js":"506293f570368436db3a73bcbd0c24fd26308635","assets/lp-campaigns.css":"08cb2bab24b48a6b660413fab7b1ea9668a80fab","global-ui.js":"0b0c9d3f5b35f9e17e0c6e4c13d3736343700fb6","home-round2.js":"758506fda0330f4b745fa8268e81ba243a2cbfc9","home-runtime.js":"71c5b327cc8d545e7aedd153ea41f32261c4c216","catalog-sync.js":"05b546f0dbe32770db0c6ef9d730127d0939fea5","portfolio/camera-canon-t7-3d/index.html":"02df81b613ecf9c4fd4a05375b0fb54ae486d3eb","portfolio/edicao-podcast-workshop/index.html":"5cc509ea2c98c3bb3ecf9babdf61310f91c2c88f","portfolio/fotos-para-ecommerce/index.html":"d91d71ee2ba8d4ff3ad0fe35c2a0598fdf7ccbe3","portfolio/motion-ia-video-campanhas/index.html":"36eac109d0ea544c5d39a03472bf7dceb9441196","portfolio/produto-3d-egeo/index.html":"e73fab39f7e8943ce22286e42d791c3ce4401659","portfolio/produtos-3d-codex-blender/index.html":"ef0c9bf2ffeb50dc90d58ff355661cb5dfc488c8"}
OUT = pathlib.Path('evidence')
OUT.mkdir(exist_ok=True)

def deployed(item):
    path, sha = item
    url = BASE + path.removesuffix('index.html') + '?release=' + SHA[:12]
    for attempt in range(18):
        try:
            with urllib.request.urlopen(url+'&check='+str(attempt), timeout=18) as response:
                data = response.read()
                actual = hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
                if actual == sha and response.status == 200:
                    print('PUBLIC HASH OK', path, sha, flush=True)
                    return
        except OSError:
            pass
        time.sleep(8)
    raise RuntimeError('Conteúdo público divergente em '+path)

async def smoke():
    async with async_playwright() as p:
        browser=await p.chromium.launch(channel='chrome')
        for width in (1366,390):
            for slug in ['', 'video-ia/', 'landing-pages/', 'servicos/', 'portfolio/camera-canon-t7-3d/']:
                ctx=await browser.new_context(viewport={'width':width,'height':844})
                await ctx.route('**/*googletagmanager.com/**',lambda r:r.abort())
                await ctx.route('**/*google-analytics.com/**',lambda r:r.abort())
                page=await ctx.new_page()
                page.set_default_timeout(15000)
                url=BASE+slug
                r=await page.goto(url+'?release='+SHA[:12],wait_until='domcontentloaded')
                assert r.status==200 and await page.locator('link[rel=canonical]').get_attribute('href')==url
                assert 'noindex' not in await page.locator('meta[name=robots]').get_attribute('content')
                assert await page.locator('h1').count()==1
                assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
                if not slug:
                    assert await page.locator('#heroTitle').evaluate("e=>e.tagName==='H2'")
                    assert await page.locator('#pdfTabs').evaluate('e=>e.inert')
                    await page.locator('#msUnifiedHeroStage').wait_for(state='attached')
                if slug=='servicos/':
                    for lp in ('video-ia','landing-pages'):
                        assert await page.locator(f'#catalog a[href="/{lp}/"]').count()
                    await page.locator('button[data-add]:visible').first.click()
                    await page.locator('#drawer.open #items .item').first.wait_for(state='visible')
                    await page.locator('#items button[data-del]').first.click()
                    assert not await page.locator('#items .item').count()
                    await page.locator('#closeBtn').click()
                if slug=='landing-pages/':
                    frame=page.locator('.demo-frame').first
                    await frame.scroll_into_view_if_needed()
                    await frame.locator(':scope > iframe').wait_for(state='attached')
                if slug in ('video-ia/','landing-pages/'):
                    assert await page.locator('a[href*="wa.me/"][href*="text="]').count()
                await page.screenshot(path=str(OUT/f"{width}-{slug.strip('/').replace('/','_') or 'home'}.jpg"),type='jpeg',quality=75)
                print('PUBLIC INTERACTION OK',width,url,flush=True)
                await ctx.close()
        await browser.close()

with ThreadPoolExecutor(max_workers=10) as pool:
    list(pool.map(deployed,EXPECTED.items()))
asyncio.run(smoke())
