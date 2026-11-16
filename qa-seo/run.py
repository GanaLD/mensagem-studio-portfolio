import asyncio, json, pathlib
from playwright.async_api import async_playwright

BASE = 'https://mensagemstudio.shop'
OUT = pathlib.Path('evidence')
OUT.mkdir(exist_ok=True)

async def test(browser, width, slug):
    context = await browser.new_context(viewport={'width': width, 'height': 900 if width > 800 else 800}, device_scale_factor=1)
    await context.route('**/g/collect*', lambda route: route.abort())
    page = await context.new_page()
    await page.add_init_script("""window.lab={cls:0}; for(const t of ['largest-contentful-paint','layout-shift'])try{new PerformanceObserver(list=>{for(const e of list.getEntries()){if(t==='layout-shift'){if(!e.hadRecentInput)window.lab.cls+=e.value}else window.lab.lcp=e.startTime}}).observe({type:t,buffered:true})}catch(e){}""")
    r = await page.goto(BASE+'/wix-preview/'+slug, wait_until='domcontentloaded',timeout=90000)
    await page.wait_for_timeout(2500)
    row = {'width':width,'page':slug or 'home','http':r.status,'title':await page.title()}
    row.update(await page.evaluate("""()=>({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,robots:document.querySelector('meta[name=robots]')?.content,lab:window.lab})"""))
    assert row['http']==200 and row['h1']==1 and 'noindex' in row['robots'],row
    assert row['documentWidth']<=width+1,row
    await page.screenshot(path=str(OUT/f"{width}-{slug.strip('/') or 'home'}.jpg"),type='jpeg',quality=75,timeout=45000)
    if not slug:
        assert await page.locator('#heroTitle').evaluate("e=>e.tagName")== 'H2'
        assert await page.locator('#pdfTabs').evaluate('e=>e.inert')
        assert await page.locator('a[href="/wix-preview/video-ia/"]').count()
        assert await page.locator('a[href="/wix-preview/landing-pages/"]').count()
        assert await page.locator('#msUnifiedHeroStage').count()
        row['frames']=await page.locator('iframe').count()
    elif slug=='servicos/':
        btn=page.locator('button[data-add]:visible').first
        await btn.click(timeout=10000)
        row['cart']=await page.locator('#cartCount').inner_text()
        assert int(row['cart'])>=1,row
    else:
        assert await page.locator('a[href*="wa.me/"][href*="text="]').count()
        faq=page.locator('details > summary').first
        if await faq.count():
            await faq.click()
            assert await faq.evaluate('e=>e.parentNode.open')
    print(json.dumps(row,ensure_ascii=False),flush=True)
    await context.close()

async def main():
    widths=[1920,1366,768,390,360]
    failures=[]
    async with async_playwright() as p:
        browser=await p.chromium.launch(channel='chrome',args=['--no-sandbox'])
        for width in widths:
            for slug in ['','video-ia/','landing-pages/','servicos/']:
                try:await test(browser,width,slug)
                except Exception as e:failures.append((width,slug,str(e)));print('FAIL',failures[-1],flush=True)
        await browser.close()
    pathlib.Path('evidence/failures.json').write_text(json.dumps(failures,ensure_ascii=False))
    assert not failures,failures
asyncio.run(main())
