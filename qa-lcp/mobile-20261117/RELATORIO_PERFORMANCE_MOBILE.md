# Mensagem Studio — conclusão da etapa de performance mobile

Validação de produção em 17 de novembro de 2026. Domínio canônico https://mensagemstudio.shop/.

A otimização antecipa o carregamento das fontes originais e usa carregamento nativo progressivo nos quatro vídeos de cases abaixo da dobra em Vídeo com IA. O código de animação, a cena 3D e o catálogo comercial conservaram seu conteúdo e comportamento.

## Medições

Lighthouse 12.8.2, categorias performance e accessibility, Chrome headless, cache frio, mobile padrão e preset desktop. Três navegações por página e perfil. Os números abaixo são medianas de laboratório. A linha de base foi registrada em 16/11 e a produção final em 17/11. A versão principal do Lighthouse e suas configurações são iguais entre as rodadas. As revisões de Chrome variaram entre runners e estão registradas nos JSONs. Não há medição de INP de usuários reais nesta etapa.

| Página e perfil | LCP antes → depois | CLS antes → depois | TBT antes → depois | MB antes → depois | Desempenho antes → depois | Acessibilidade antes → depois |
|---|---|---|---|---|---|---|
| Home mobile | 3.10 → 1.88 | 0.0097 → 0.0089 | 429 → 454 | 24.84 → 24.90 | 68 → 79 | 100 → 100 |
| Vídeo com IA mobile | 6.26 → 3.09 | 0.0542 → 0.0000 | 100 → 100 | 1.00 → 0.64 | 72 → 83 | 100 → 100 |
| Landing Pages mobile | 3.11 → 2.32 | 0.0029 → 0.0000 | 55 → 76 | 0.39 → 0.39 | 89 → 98 | 100 → 100 |
| Home desktop | 0.97 → 0.53 | 0.0012 → 0.0015 | 0 → 4 | 42.85 → 44.44 | 88 → 90 | 100 → 100 |
| Vídeo com IA desktop | 1.34 → 0.76 | 0.0433 → 0.0000 | 0 → 0 | 1.00 → 1.00 | 96 → 100 | 100 → 100 |
| Landing Pages desktop | 0.83 → 0.75 | 0.0016 → 0.0000 | 0 → 0 | 0.39 → 0.39 | 99 → 100 | 100 → 100 |

LCP em segundos, TBT em milissegundos, transferência em MB decimais e notas de 0 a 100. A transferência da home inclui a cena e varia com o instante de encerramento da coleta.

### Homologação

| Página mobile | LCP antes → depois | Faixa após ajuste |
|---|---|---|
| Home | 3.00 → 1.94 s | 1.92–2.10 s |
| Vídeo com IA | 6.18 → 3.02 s | 2.50–4.59 s |
| Landing Pages | 2.92 → 2.20 s | 1.31–2.36 s |

## Alterações publicadas

| Arquivo | Intervenção | Verificação |
|---|---|---|
| index.html | Preload de Fugaz One e Work Sans e CSS local, eliminando a importação encadeada de fontes nesta página | Lighthouse, igualdade semântica do HTML, screenshots e HeroScroll |
| video-ia/index.html | Preload de Fugaz One e Inter, CSS local e loading="lazy" nos quatro vídeos de cases | Lighthouse, reprodução do hero e case, poster, FAQ e WhatsApp |
| landing-pages/index.html | Preload de Fugaz One e Inter e CSS local | Lighthouse, demonstração interativa, FAQ e WhatsApp |
| assets/lcp-fonts/home.css e lp.css | Declarações das mesmas fontes, com variantes e unicode-range preservados | Fontes, geometria e captura visual |
| assets/lcp-fonts/*.woff2, quatro arquivos | Arquivos originais hospedados no próprio domínio, idênticos aos homologados | Hashes e HTTP 200 |
| assets/lcp-fonts/*-OFL.txt, três arquivos | Licenças de Fugaz One, Inter e Work Sans | Licenças incluídas com os arquivos |

Os arquivos equivalentes foram editados primeiro dentro de wix-preview/. A promoção aplicou apenas os mesmos trechos, adaptando seus caminhos para /assets/. Uma comparação do HTML confirmou igualdade dos demais elementos, metadados, textos, links e scripts.

## GitHub e restauração

- Repositório GanaLD/mensagem-studio-portfolio, branch main. Raiz de produção e wix-preview/ de homologação.
- Ponto inicial c6cfdd8ec7db02a313f0e5cf252e1463008ee91f.
- Preview de fontes 1f17938320e22c87b33e5e48c48c5f8fe73e43dd.
- Preview de posters 77711b4e2b33882466dfda92d5eb512304006b80.
- Commit de produção 6b65f83baa55bca5fbdc9c38efa4c9af4591b0d2.
- Deploy confirmado pelo GitHub Pages e por igualdade byte a byte dos 12 arquivos publicados. https://github.com/GanaLD/mensagem-studio-portfolio/actions/runs/44128107827
- Rollback da produção por git revert 6b65f83baa55bca5fbdc9c38efa4c9af4591b0d2, seguido do deploy normal do GitHub Pages. O pai 77711b4 mantém a produção anterior e os ajustes homologados no preview.

## Evidências

- Linha de base https://github.com/GanaLD/mensagem-studio-portfolio/actions/runs/43978618739
- Lighthouse do preview https://github.com/GanaLD/mensagem-studio-portfolio/actions/runs/43980174851
- Testes do preview https://github.com/GanaLD/mensagem-studio-portfolio/actions/runs/44126608578
- Medições e regressão em produção https://github.com/GanaLD/mensagem-studio-portfolio/actions/runs/44128148321
- JSONs e capturas em https://github.com/GanaLD/mensagem-studio-portfolio/tree/qa/performance-20261116/qa-lcp/mobile-20261117

Os ZIPs no branch de QA preservam os relatórios Lighthouse completos e capturas. Os artefatos adicionais dos runs têm retenção de 30 dias.

## Pendências e limites

Vídeo com IA permanece acima de 2,5 s na mediana móvel. O elemento LCP final é o H1 “A sua marca em outra dimensão.”. Na amostra de 3,09 s, o Lighthouse atribui 0,60 s ao TTFB e 2,49 s ao atraso de renderização. A auditoria já não aponta recursos bloqueadores de renderização nessa amostra. Os registros não isolam um único download como causa de todo o atraso restante. Os posters originais e o script de analytics continuam presentes nas requisições. As três amostras móveis variaram de 2,44 a 4,61 s.

A home mantém transferência inicial próxima de 25 MB, incluindo o modelo notebook-scene.glb.gz de aproximadamente 16 MB. O TBT móvel mediano variou de 429 para 454 ms. Em Landing Pages, variou de 55 para 76 ms. Esses aumentos estão registrados, mesmo com melhora de LCP. TBT não mede INP de campo.

A main avançou após esta publicação. Na conferência foi encontrado o commit 36566d4db9aa2cda91cbded36f5fc115dee27da0, com 13 commits posteriores, incluindo analytics e serviços. As medições desta tabela documentam o release 6b65f83. As alterações posteriores foram preservadas e podem afetar novas medições. Antes de qualquer rollback, reverta exclusivamente o commit desta etapa e revise eventuais conflitos com o trabalho posterior.

## Testes

Trinta casos de preview passaram, comparando antes e depois em 1920, 1366, 768, 390 e 360 px. A geometria dos textos coincidiu nas quinze comparações e as capturas foram revisadas. HeroScroll pronto, progresso da rolagem e alternância de áudio foram verificados. Foram exercitados menu, vídeos, poster dos cases, demonstração incorporada, FAQ e links de WhatsApp.

Seis casos pós-deploy passaram em 1366 e 390 px, vinculando o corpo HTTP recebido ao commit 6b65f83 antes das interações. Evidência em https://github.com/GanaLD/mensagem-studio-portfolio/actions/runs/44128679781 . As três URLs retornaram HTTP 200, um H1, canonical autorreferente, robots indexável e JSON-LD válido. Os doze arquivos de produção coincidiram byte a byte com o commit publicado.

Uma execução ampliada teve timeout ao aguardar estabilidade do botão de áudio animado em 1920 px. O arquivamento também encontrou atualização concorrente do branch de QA e foi recuperado por nova execução. Esses registros foram mantidos nos logs.

A checagem isolada de 1920 px passou após retirar a captura do canvas dessa execução e clicar na posição visível do botão, com hit testing. O HTML foi confirmado contra o commit publicado. Essa repetição resolve a pendência de interação do áudio. Evidência em https://github.com/GanaLD/mensagem-studio-portfolio/actions/runs/44184449279 . As capturas comparativas das cinco larguras permanecem no conjunto de preview aprovado.
