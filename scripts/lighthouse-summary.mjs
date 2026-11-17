import { existsSync, readFileSync, readdirSync, appendFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const folder = 'lighthouse-reports';
if (!existsSync(folder)) throw new Error('No Lighthouse reports were generated');
const reportFiles = readdirSync(folder).filter(name => name.endsWith('.report.json'));
if (!reportFiles.length) throw new Error('No Lighthouse JSON reports found');
const data = reportFiles.map(name => JSON.parse(readFileSync(join(folder, name), 'utf8')));
const byUrl = new Map();
for (const report of data) {
  const url = new URL(report.finalDisplayedUrl || report.finalUrl || report.requestedUrl).pathname;
  const score = key => report.categories?.[key]?.score == null ? null : Math.round(report.categories[key].score * 100);
  const metric = key => report.audits?.[key]?.numericValue ?? null;
  const entry = {
    page: url,
    performance: score('performance'),
    accessibility: score('accessibility'),
    seo: score('seo'),
    lcpSec: metric('largest-contentful-paint') == null ? null : +(metric('largest-contentful-paint') / 1000).toFixed(2),
    cls: metric('cumulative-layout-shift') == null ? null : +metric('cumulative-layout-shift').toFixed(3),
    tbtMs: metric('total-blocking-time') == null ? null : Math.round(metric('total-blocking-time'))
  };
  if (!byUrl.has(url)) byUrl.set(url, []);
  byUrl.get(url).push(entry);
}
const headings = ['URL', 'Performance', 'Acessibilidade', 'SEO', 'LCP (s)', 'CLS', 'TBT (ms)'];
const lines = ['## Lighthouse CI — mensagemstudio.shop (mobile)', '', 'Dados de laboratório, não métricas reais de visitantes. São mostradas as medianas de cada URL.', '', '| ' + headings.join(' | ') + ' |', '| ' + headings.map(() => '---').join(' | ') + ' |'];
const table = [];
for (const [page, runs] of [...byUrl].sort(([a], [b]) => a.localeCompare(b))) {
  const median = key => {
    const values = runs.map(item => item[key]).filter(n => Number.isFinite(n)).sort((a,b)=>a-b);
    return values.length ? values[Math.floor(values.length/2)] : '—';
  };
  const entry = Object.fromEntries(['performance', 'accessibility', 'seo', 'lcpSec', 'cls', 'tbtMs'].map(k => [k, median(k)]));
  table.push({page, ...entry});
  lines.push('| ' + [page, entry.performance, entry.accessibility, entry.seo, entry.lcpSec, entry.cls, entry.tbtMs].join(' | ') + ' |');
}
lines.push('', 'Metas de referência: LCP ≤ 2,5 s; CLS ≤ 0,1. Resultados são aproximados e sujeitos a variação em CI.');
const markdown = lines.join('\n') + '\n';
writeFileSync(join(folder, 'RESUMO.md'), markdown);
writeFileSync(join(folder, 'metrics.json'), JSON.stringify({generatedAt:new Date().toISOString(), runs:reportFiles.length, pages:table}, null, 2));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
console.log(markdown);
