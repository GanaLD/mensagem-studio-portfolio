import asyncio, json, pathlib, urllib.request
from urllib.parse import urlsplit
from playwright.async_api import async_playwright

BASE = 'https://mensagemstudio.shop'
OUT = pathlib.Path('evidence')
OUT.mkdir(exist_ok=True)

async def test(browser, width, slug, before=False):
    phase='antes' if before else 'depois'
    context = await browser.new_context(viewport={'width': width, 'height': 900 if width > 800 else 800}, device_scale_factor=1)
    await context.route('**/g/collect*', lambda route: route.abort())
    await context.route('**/google-analytics.com/**', lambda r:r.abort())
    await context.route('**/googletagmanager.com/**', lambda r:r.abort())
    if before:
        # Replay only affected files. The commercial pages were absent from the original preview.
        async def original(route):
            path=urlsplit(route.request.url).path.strip('/')
            if urlsplit(route.request.url).netloc!='mensagemstudio.shop':
                return await route.continue_()
            if path in ['wix-preview','wix-preview/servicos']:
                path+='/index.html'
            elif path in ['wix-preview/video-ia','wix-preview/landing-pages']:
                path=path.removeprefix('wix-preview/')+'/index.html'
            if path not in original_files:
                return await route.continue_()
            await route.fulfill(body=original_files[path],content_type='text/html; charset=utf-8' if path.endswith('.html') else 'text/javascript; charset=utf-8')
        await context.route('https://mensagemstudio.shop/**', original)
    page = await context.new_page();page.set_default_timeout(8000)
    await page.add_init_script("""window.lab={cls:0}; for(const t of ['largest-contentful-paint','layout-shift'])try{new PerformanceObserver(list=>{for(const e of list.getEntries()){if(t==='layout-shift'){if(!e.hadRecentInput)window.lab.cls+=e.value}else window.lab.lcp=e.startTime}}).observe({type:t,buffered:true})}catch(e){}""")
    r = await page.goto(BASE+'/wix-preview/'+slug, wait_until='domcontentloaded',timeout=90000)
    await page.wait_for_timeout(2500)
    row = {'phase':phase,'width':width,'page':slug or 'home','http':r.status,'title':await page.title()}
    row.update(await page.evaluate("""()=>({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,robots:document.querySelector('meta[name=robots]')?.content,lab:window.lab})"""))
    assert row['http']==200,row
    if not before:assert row['h1']==1 and 'noindex' in row['robots'],row
    assert row['documentWidth']<=width+1,row
    await page.screenshot(path=str(OUT/f"{phase}-{width}-{slug.strip('/') or 'home'}.jpg"),type='jpeg',quality=75,timeout=45000)
    if before:
        print(json.dumps(row),flush=True);await context.close();return
    if not slug:
        assert await page.locator('#heroTitle').evaluate("e=>e.tagName")== 'H2'
        assert await page.locator('#pdfTabs').evaluate('e=>e.inert')
        assert await page.locator('a[href="/wix-preview/video-ia/"]').count()
        assert await page.locator('a[href="/wix-preview/landing-pages/"]').count()
        assert await page.locator('#msUnifiedHeroStage').count()
        row['frames']=await page.locator('iframe').count()
        if width in (1366,390):
            await page.locator('#pdfMenuToggle').press('ArrowDown')
            assert not await page.locator('#pdfTabs').evaluate('e=>e.inert')
            await page.keyboard.press('Escape')
            assert await page.locator('#pdfTabs').evaluate('e=>e.inert')
            await page.locator('.ms-sound-toggle').click()
            assert await page.locator('.ms-sound-toggle').get_attribute('aria-label') in ('OFF · Ligar trilha sonora','ON · Desligar trilha sonora')
            # Confirm the isolated hero has an active canvas or a reachable loading fallback.
            assert await page.locator('#cenaHero1Frame').count()==1
            row['heroReady']=await page.evaluate('()=>window.MSCenaHero?.ready')
            row['heroFallback']=await page.locator('#msCenaHeroGate button[data-continue]').count()
            assert row['heroReady'] or row['heroFallback']
    elif slug=='servicos/':
        btn=page.locator('button[data-add]:visible').first
        await btn.click(timeout=10000)
        await page.locator('#drawer.open #items .item').first.wait_for(state='visible')
        row['item']=await page.locator('#items .item strong').first.inner_text()
        assert row['item'].strip(),row
        assert await page.locator('#items .qty span').first.text_content()=='1'
        await page.locator('#items button[data-plus]').first.click()
        assert await page.locator('#items .qty span').first.text_content()=='2'
        await page.locator('#items button[data-del]').first.click()
        assert await page.locator('#items .item').count()==0
        await page.locator('#closeBtn').click()
        for cat,slug2 in [('Motion e VFX','video-ia'),('Web / HTML','landing-pages')]:
            radio=page.get_by_role('radiogroup',name='Categorias de serviços').get_by_role('radio',name=cat,exact=True)
            if await radio.count() and await radio.is_visible():await radio.click()
            else:await page.locator(f'#filters button[data-cat="{cat}"]').click()
            await page.locator(f'#catalog a[href$="/{slug2}/"]').wait_for(state='attached')
    else:
        assert await page.locator('a[href*="wa.me/"][href*="text="]').count()
        if slug=='landing-pages/' and width in (1366,390):
            first=page.locator('.demo-frame').first
            await first.scroll_into_view_if_needed()
            await first.locator(':scope > iframe').wait_for(state='visible')
            assert await first.locator(':scope > iframe').get_attribute('src')
        if slug=='video-ia/' and width in (1366,390):
            video=page.locator('video[controls]').first
            await video.evaluate('v=>{v.muted=true;v.play().catch(()=>{})}')
            try:
                await page.wait_for_function('document.querySelector("video[controls]").currentTime>0',timeout=12000)
                row['videoPlayback']=True
            except Exception:
                row['videoPlayback']=False
        faq=page.locator('details > summary').first
        if await faq.count():
            await faq.click()
            assert await faq.evaluate('e=>e.parentNode.open')
    print(json.dumps(row,ensure_ascii=False),flush=True)
    await context.close()

def source(path):
    url='https://raw.githubusercontent.com/GanaLD/mensagem-studio-portfolio/4324b0569deedb37c802c44fa676e90a0332e0d9/'+path
    return urllib.request.urlopen(url,timeout=20).read()
original_files={p:source(p) for p in ['wix-preview/index.html','wix-preview/servicos/index.html','video-ia/index.html','landing-pages/index.html','wix-preview/home-runtime.js','wix-preview/home-round2.js','wix-preview/catalog-sync.js']}
async def main():
    widths=[1920,1366,768,390,360]
    failures=[]
    async with async_playwright() as p:
        browser=await p.chromium.launch(channel='chrome',args=['--no-sandbox'])
        for width in widths:
            for slug,before in [(s,b) for s in ['','video-ia/','landing-pages/','servicos/'] for b in (True,False)]:
                try:await test(browser,width,slug,before)
                except Exception as e:failures.append((width,slug,str(e)));print('FAIL',failures[-1],flush=True)
        for slug in ['produto-3d-egeo','edicao-podcast-workshop','motion-ia-video-campanhas','produtos-3d-codex-blender','camera-canon-t7-3d','fotos-para-ecommerce']:
            for js in [False,True]:
                ctx=await browser.new_context(java_script_enabled=js,viewport={'width':390,'height':844})
                page=await ctx.new_page();page.set_default_timeout(8000)
                try:
                    res=await page.goto(BASE+'/wix-preview/portfolio/'+slug+'/',wait_until='domcontentloaded')
                    assert res.status==200 and await page.locator('main h1').count()==1
                    if slug!='fotos-para-ecommerce':await page.locator('main .case-study-section').wait_for(state='attached')
                    print('CASE',slug,'JS',js,'OK',flush=True)
                except Exception as e:failures.append((slug,js,str(e)))
                await ctx.close()
        await browser.close()
    pathlib.Path('evidence/failures.json').write_text(json.dumps(failures,ensure_ascii=False))
    assert not failures,failures
asyncio.run(main())
