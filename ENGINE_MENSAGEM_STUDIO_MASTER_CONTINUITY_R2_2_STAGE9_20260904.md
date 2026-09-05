# ENGINE MENSAGEM STUDIO — MASTER CONTINUITY / HANDOFF CANÔNICO

**Linha atual:** EMS EDITOR / StudioFrame Editor Engine 12 — R2.2  
**Checkpoint operacional:** `R2.2_STAGE9_IN_PROGRESS_SOURCE_RECOVERY_GATE`  
**Data do checkpoint:** 2026-09-04 — America/Sao_Paulo  
**Objetivo deste arquivo:** preservar projeto, arquitetura, contratos, dados, decisões, andamento, evidências, hashes, caminhos, riscos e plano completo de continuidade sem regressão nem reconstrução por memória.

---

## 0. REGRA DE USO DESTE CHECKPOINT

Este arquivo é um **handoff operacional**, não um resumo informal.

Ao continuar o ENGINE MENSAGEM STUDIO:

1. Não reiniciar arquitetura do zero.
2. Não escolher uma versão antiga só porque é mais fácil de abrir.
3. Não confundir arquivos presentes com funções certificadas.
4. Não tratar QA estrutural como aprovação visual do usuário.
5. Não usar Recovery como fluxo normal de desenvolvimento.
6. Não alterar `main`, `MSE2_RELEASE_CURRENT` ou produção antes dos gates definidos neste documento.
7. Não expor, imprimir, copiar para frontend, logs ou evidências valores de credenciais existentes.
8. Toda continuação deve partir do **estado R2.2 Stage 8 certificado + Stage 9 em andamento**.
9. O Stage 9 só pode publicar o artefato que reproduzir exatamente o build certificado do Stage 8, salvo nova alteração editorial explicitamente autorizada e recertificada.
10. Se uma fonte divergir deste checkpoint, aplicar a hierarquia de precedência da Seção 5 e registrar a divergência antes de alterar código.

---

# 1. IDENTIDADE DO PROJETO

## 1.1 Nomes que aparecem no histórico

O projeto passou por várias denominações relacionadas e deve ser entendido como uma linha evolutiva, não como projetos desconectados:

- Mensagem Studio Engine / MSE;
- Mensagem Studio Engine 2 / MSE2;
- StudioFrame;
- StudioFrame Editor;
- Editor Engine 12 / EE12;
- EMS Editor HTML;
- ENGINE MENSAGEM STUDIO;
- Mensagem Studio Portfolio Builder;
- R2 / R2.1 / R2.2 como linha de reengenharia atual.

## 1.2 Produto atual

O produto atual é um **editor desktop Windows + engine de site + pipeline de dados/mídia + Build/Preview/Publicação** para a Mensagem Studio.

Ele deve permitir editar e publicar, de maneira visual e governada:

- Home;
- projetos e suas mídias;
- coleções/categorias;
- páginas e subpáginas;
- serviços;
- orçamento;
- briefing;
- player próprio;
- showcases de vídeo/PDF/HTML5/3D;
- experiência imersiva WebGL/scroll;
- identidade visual;
- navegação;
- SEO;
- assets do Google Drive;
- Preview do artefato real;
- Save cloud-first;
- Build determinístico;
- publicação GitHub/Pages;
- diagnóstico, evidência, rollback e versionamento.

---

# 2. LOCALIZAÇÕES CANÔNICAS E RAÍZES

## 2.1 Workspace Windows preservado

Origem histórica atual do workspace EE12:

```text
C:\Users\gabri\.codex\visualizations\2026\08\29\01a04dfa-4665-7de0-94df-9adaff4d88b9\EDITOR_ENGINE_12_WORKSPACE
```

Destino pretendido, ainda não confirmado como migração física concluída:

```text
C:\Users\gabri\Documents\Codex\STUDIOFRAME_EDITOR_ENGINE_12
```

Ferramenta de migração previamente definida:

```text
candidate_program\tools\install_editor_engine_12_workspace_to_documents.ps1
```

**Regra:** não apagar a origem até validar cópia integral, hashes, inicialização, assets e funcionamento no destino.

## 2.2 Google Drive — raízes recuperadas

```text
MSE2 ROOT
ID: 1x2jhqF6coZ7Xih2UMUQM0-Hvswezdly_

PROGRAM
ID: 1-RofYnA1Pm1HrP8KZcGOe9BBMuwaRraD

REPOSITORY / EVIDENCE
ID: 1aqWgUT8oRUVHV0VglELWwCBAM9Q5gzXM

INSTALLER
ID: 17P_K2Tz50QOiXwAPMDHJMxMOqcvDrcsR

R2.1 / R2.2 ADVANCED CANDIDATE
Folder: R2_1_WINDOWS_VALIDATION_CURRENT
ID: 1_apUWK8aHFBvHHrLQoDX_zk3xzJc2tr7
```

## 2.3 Google Drive — origem de mídia configurada

```text
Nome: Portfólio Aesthetic
ID: 1ePsjyC57ddsmZYfQPB7OvyA8V1XHbZj0
```

**Contrato:** Drive é origem/read-only de mídia. Não usar Google Drive Viewer/`/preview` como player público final.

## 2.4 GitHub

Repositório operacional recuperado:

```text
GanaLD/mensagem-studio-portfolio
```

Branches relevantes:

```text
main
studioframe-state
r22-stage9-candidate-20260904
```

Estado observado no início deste Stage 9:

```text
main HEAD:
b6bd9a71f235448bfe860af57ca5b537860c08c7
mensagem: StudioFrame V7.5.1: carrossel, Hero mudo e acabamento visual

studioframe-state HEAD:
59fe2c52d45aa0f1ec009532ce6da8b3d0ecd4dd
mensagem: StudioFrame 7.12.20: registra atividade online
```

A branch `r22-stage9-candidate-20260904` foi criada nesta continuidade a partir do `main` acima para isolar o Stage 9 e manter produção intacta.

---

# 3. BASE FÍSICA CANÔNICA

## 3.1 Release base R2 integral

```text
Release: MSE2-EE12-CANONICAL-FULL-R2-20260903
Arquivo: MSE2_EE12_WEB_STARTER2_CANONICAL_FULL_PROGRAM_20260903.zip
Tamanho: 516,945,617 bytes
SHA-256: 085c145d5b0b3360c682ee297c3baf7eaba1a2bfa275b9a04044e02c59be1010
Partes: 13
Entrypoint: StudioFrame.exe
```

A base foi **reconstruída fisicamente nesta sessão** a partir das 13 partes do Drive.

Resultado da verificação local desta continuidade:

```text
assembled_size = 516945617
assembled_sha256 = 085c145d5b0b3360c682ee297c3baf7eaba1a2bfa275b9a04044e02c59be1010
unzip_test = PASS / no errors
```

Portanto a operação Stage 9 está ancorada na base exata congelada, e não em um ZIP aproximado.

## 3.2 Conteúdo preservado da base

A base contém, entre outros:

```text
StudioFrame.exe
app/
static/
templates/
public_assets/
project-state/
runtime/
SOURCE_MATERIALS/
SOURCE_LIBRARY/
DOCUMENTACAO/
TEST_EVIDENCE/
tools/
DIST/
HANDOFF/
SIGNATURES/
embedded_credentials/
```

**Atenção:** a existência de `embedded_credentials/` não autoriza leitura, cópia, logging ou publicação de seus valores.

---

# 4. LINHA DE VERSÕES E EVOLUÇÃO

## 4.1 Linha histórica relevante

### V8 — 2026-08-25

Uma release V8 foi tratada como canônica em sua fase, com player próprio, briefing e estrutura de portfólio já em funcionamento.

### V9 / V9.1 — 2026-08-27 a 2026-08-28

A linha V9 expandiu:

- temas;
- árvore macro do editor;
- construtor de Hero/Fundo animado;
- Preview/Build;
- publicação;
- organização de páginas/projetos/blocos;
- controles de aparência e movimento.

Checkpoint histórico relevante:

```text
V9_1_PHASE15_FINAL_RELEASE_CHECKPOINT_20260828.zip
```

### V9.1.1 / baseline de recuperação — 2026-08-29

Base histórica importante:

```text
STUDIOFRAME_V9_1_1_HOTFIX_R2_WINDOWS_PROGRAMA_20260829.zip
```

O Editor Engine 12 foi derivado desta linha, mas a arquitetura defeituosa identificada posteriormente **não deve ser restaurada como baseline de UI**.

### EE12 / EMS Editor HTML 1 e HTML 2

A linha EE12 concentrou a recuperação funcional e depois a reengenharia do editor. O aprendizado central foi:

> preservar capacidades e dados válidos ≠ preservar uma arquitetura visual/estrutural ruim.

### R2 — 2026-09-03

Foi congelada uma base integral, portátil e verificável do programa.

### R2.1 — Windows Validation Candidate

```text
Release: MSE2-EE12-R2.1-WINDOWS-VALIDATION-CANDIDATE-20260903
Overlay cumulativo: true
Arquivos do overlay: 26
```

Status de certificação R2.1:

```text
r21_a: 24/24 PASS
r21_b: 62/62 PASS
r21_c: 40/40 PASS
r21_d: 36/36 PASS
r21_e: 18/18 PASS
r21_f: 59/59 PASS
visual: 293/293 PASS
global_selftest: 107/107 PASS
protected_regression: 16/16 suites PASS
external_network: PENDING_WINDOWS_NETWORK
```

### R2.2 — linha atual

R2.2 é a linha corrente de engenharia e substitui o modelo de remendos/recovery por contratos explícitos, owners, estados, QA, evidências e gates.

Stages executados: **0 a 8**.  
Stage atual: **9 — GitHub / Pages / Publication**.

---

# 5. HIERARQUIA DE PRECEDÊNCIA

Em caso de conflito entre materiais:

1. Solicitação atual aprovada do usuário;
2. contratos e manuais V2 atuais;
3. contratos R2.2 de estágio;
4. Working State / receipts / hashes certificados;
5. regras V1 que não conflitem com V2/R2.2;
6. implementação existente;
7. legado apenas como referência de capacidade ou migração.

Nunca usar código antigo para anular um contrato novo simplesmente porque o código antigo “já existia”.

---

# 6. MATERIAIS DE GOVERNANÇA CANÔNICOS

Materiais recuperados e tratados como base de regras:

```text
MANUAL_UIUX_DESENVOLVIMENTO_V2_MASTER
WEB_AGENT_STUDIO_MASTER_ENGINEERING_SPEC_V2_0
ORYZO_EXPERIENCE_ENGINE_MASTER_V2_IMMERSIVE_V3_1
GUIA_REGRAS_PAGINACAO_ARVORE_MASTER_BRANDING_V2_CORRIGIDO
MENSAGEM_IMMERSIVE_WEB_STARTER_V3_1.zip
ORYZO / STYLE REFERENCE
12 temas / presets herdados quando compatíveis
```

Além deles, os contratos R2.1 e R2.2 gerados por estágio passam a ser parte do conjunto de governança.

---

# 7. DEFINIÇÃO DE “PRONTO”

Nenhuma função pode ser considerada pronta apenas porque existe código.

Uma função fica pronta quando possui, conforme aplicável:

- owner único;
- estado canônico;
- UI/controle real;
- efeito físico observável;
- persistência;
- Preview;
- Build;
- responsividade;
- comportamento de erro/loading/sucesso;
- teste técnico;
- teste funcional;
- teste visual;
- evidência;
- integração de produção;
- read-back quando existir gravação remota.

**Código ≠ função pronta.**  
**Teste técnico ≠ aprovação visual.**  
**Arquivo no Drive ≠ asset integrado.**  
**Build gerado ≠ site publicado.**

---

# 8. CONTRATO DE NÃO-RECOVERY

Recovery é procedimento excepcional de restauração após dano comprovado.

Fluxo normal obrigatório:

```text
INVENTÁRIO
→ DIAGNÓSTICO
→ PLANO
→ MAPA DE IMPACTO
→ CHECKPOINT
→ IMPLEMENTAÇÃO REAL
→ TESTES TÉCNICOS
→ TESTES FUNCIONAIS
→ TESTES VISUAIS
→ TESTE MANUAL
→ BUILD
→ PACKAGE
→ ENTREGA
→ APROVAÇÃO
→ PUBLICAÇÃO
→ VERIFICAÇÃO PÓS-PUBLICAÇÃO
```

Não executar “recovery” por padrão para resolver desalinhamento, overflow, painel quebrado ou função incompleta.

---

# 9. ARQUITETURA R2.2

## 9.1 Camadas

```text
[Windows / StudioFrame.exe]
        │
        ▼
[Editor Shell]
  ├─ Tree
  ├─ Workspace/Canvas
  ├─ Inspector
  ├─ Status/Diagnostics
  └─ Publication
        │
        ▼
[State / Contracts]
  ├─ editorial state
  ├─ workspace state
  ├─ dirty state
  ├─ receipts
  ├─ quote/briefing state
  └─ publication state
        │
        ├───────────────┐
        ▼               ▼
[Asset Registry]    [Component/Page Registries]
        │               │
        └───────┬───────┘
                ▼
[Exporter / Build]
  ├─ HTML modular
  ├─ data registries
  ├─ assets registry
  ├─ forms registry
  ├─ showcases registry
  ├─ health reports
  └─ deterministic artifact
                │
                ▼
[Preview = exact built artifact]
                │
                ▼
[GitHub candidate → publish → verification]
```

## 9.2 Regra owner/state

Princípio:

```text
1 função → 1 owner → 1 destino canônico de escrita
```

Leituras podem ser múltiplas; escrita concorrente sem contrato é proibida.

## 9.3 Owners/namespaces relevantes recuperados

Exemplos confirmados na linha R2.2:

```text
assets.registry
services.catalog
forms.quote
forms.briefing
forms.registry
studio.player
studio.model
studio.pdf
studio.html5
home.showcase_hub
experience.frame_loop
experience.scroll
experience.camera
experience.scene
experience.postfx
publication.save
publication.build
publication.preview
publication.publish
```

O registry global chegou a **33 owners, zero write collisions** no Stage 1.

---

# 10. CONTRATO DE UI / RESPONSIVIDADE

Problemas históricos que motivaram o contrato:

- sidebar esquerda fixa e não responsiva;
- controles/textos sobrepostos;
- painéis sem respiro;
- conteúdo espremido em vez de reorganizado;
- efeitos que não produziam resultado real;
- controles duplicados;
- tema do editor contaminando o site público;
- Preview reduzido até ficar inutilizável;
- árvore excessivamente complexa;
- navegação marcando dirty/autosave sem mutação real.

## 10.1 Shell R2.2

Stage 2 estabeleceu:

```text
Desktop: 3 colunas
Tree drawer: <= 1366px
Inspector drawer: <= 1180px
Mobile single-pane: <= 600px
```

Regra de prioridade:

1. preservar legibilidade do workspace;
2. transformar painéis laterais em drawer/overlay;
3. Preview abre como superfície apropriada;
4. nunca resolver responsividade apenas diminuindo tudo.

## 10.2 Testes de layout

No Stage 2:

```text
HTML ids: 1009
IDs duplicados: 0
CSS parse: PASS
Geometry/overflow QA: PASS em 9 viewports
```

Validação física Windows continua obrigatória antes do fechamento final.

---

# 11. EDITOR THEME ≠ PUBLIC SITE THEME

Há dois domínios visuais diferentes:

```text
Editor Shell Theme
Public Site Theme
```

Um não pode alterar silenciosamente o outro.

O Editor precisa permanecer legível e operacional mesmo quando o site público usa tema extremo, fundo escuro, efeito 3D, tipografia ou motion específicos.

---

# 12. ÁRVORE, WORKSPACE E NAVEGAÇÃO

## 12.1 Regras

- Tree é navegação/contexto, não storage paralelo.
- Selecionar item não pode marcar conteúdo como alterado.
- Tree deve abrir exatamente o owner/contexto correspondente.
- Campos de Inspector não podem escrever em namespaces concorrentes.
- Navegação não dispara Save automático se nada mudou.
- Nós vazios, duplicados e aliases sem função real devem ser removidos ou redirecionados para o owner canônico.

## 12.2 Evolução de schema

```text
Stage 1: schema 16 / inventário
Stage 3: schema 17
Stage 4: schema 18
Stage 6: schema 20
Stage 7: schema 21
```

O Stage 1 mapeou 137 nós e reorganizou o domínio conceitual em 21 áreas R2.2.

---

# 13. DADOS / SOURCE OF TRUTH

## 13.1 Estado editorial

Historicamente o sistema usa:

```text
project-state/editorial-state.json
```

O estado portátil do ZIP é baseline/cache; para operações cloud, o snapshot remoto confirmado deve ser a fonte operacional quando o Save remoto estiver certificado.

## 13.2 `studioframe-state`

A branch `studioframe-state` é a linha histórica de estado cloud do StudioFrame.

Contrato herdado e ainda válido:

```text
Save remoto só é sucesso após read-back da mesma revisão.
Build usa a revisão confirmada.
Publish usa o mesmo snapshot/artefato.
```

## 13.3 Dirty state

Stage 8 formalizou:

```text
clean
→ real mutation
→ dirty
→ saving
→ saved/local confirmed
→ remote syncing
→ remote confirmed
```

Navegação pura, foco de campo, troca de painel e ações sem alteração real **não** marcam dirty.

No-op Save deve ser suprimido.

---

# 14. PIPELINE DE ASSETS / GOOGLE DRIVE

## 14.1 Regra física de integração

Um asset só está integrado quando passa por:

```text
SOURCE
→ Asset Registry
→ MIME validation
→ metadata
→ local/cache binding
→ component binding
→ section/page binding
→ Build
→ Preview
→ health PASS
```

Ter um arquivo no Drive não significa que ele esteja em uso.

## 14.2 Stage 4

Capacidades implementadas:

- `app/asset_registry.py`;
- Drive health states;
- busca read-only;
- download probe;
- cache com SHA-256;
- proteção contra sobrescrever edição local;
- endpoints/APIs de assets;
- export de `data/assets.json`;
- export de `data/asset-health.json`;
- owner `assets.registry`;
- UI de registry;
- preservação de credenciais.

Teste conectado real recuperado:

```text
Drive root: Portfólio Aesthetic
Arquivo probe: BANNER VERVE.png
Tamanho: 335,952 bytes
Dimensão: 2560×367
Resultado: download/list PASS
```

---

# 15. PORTFÓLIO / PROJETOS / GALERIA

## 15.1 Modelo canônico

O projeto deve existir uma vez no registry canônico e ser projetado para:

- card no grid;
- página de projeto;
- SEO;
- sitemap;
- recomendação/related projects;
- mídia;
- orçamento/case relacionado.

Não duplicar título, descrição e mídia manualmente em HTML independente.

## 15.2 Hierarquia

```text
Categoria / Coleção
  └─ Projeto
      └─ Mídias
          ├─ imagem
          ├─ vídeo
          ├─ PDF
          ├─ HTML5
          └─ 3D quando permitido
```

## 15.3 Stage 3

Foi introduzido HTML modular público:

```text
templates/pages/home.html
templates/components/side_menu.html
templates/components/header.html
templates/components/footer.html
templates/components/lightbox.html
templates/sections/home_hero.html
templates/sections/home_intro.html
templates/sections/home_lettering.html
templates/sections/home_projects.html
templates/sections/home_about.html
templates/sections/home_contact.html
```

O `templates/site_index.html` legado permaneceu byte-identical como fallback naquela etapa.

Stage 3 validou 5/5 do selftest específico, compile, syntax, app selftest e synthetic build 13/13.

---

# 16. ROTAS / INVENTÁRIO DE PÁGINAS A PRESERVAR

A arquitetura R2.2 deve preservar ou migrar, sem regressão silenciosa, o inventário funcional historicamente exigido:

```text
/
/#projectsBlock
/#about
/#contact
/servicos/
/servicos/{slug}/
/projetos/{slug}/
/briefing/
/orcamento/
/sobre/
/contato/
/clientes/
/clientes/{cliente}
/tags/{tag}
/busca
/arquivo
/404
```

**Nota:** esta lista é inventário de capacidade/contrato. Nem todas as rotas foram individualmente recertificadas como gate final no Stage 8. O Stage 9/final Windows deve testar as rotas publicadas reais e registrar o resultado.

---

# 17. PLAYER / MÍDIA / SHOWCASES

## 17.1 Regra absoluta

Vídeos públicos devem usar player StudioFrame / `HTMLMediaElement` real.

Proibido como solução final:

```text
Google Drive /preview
Google Drive viewer
iframe do Drive como player principal
```

## 17.2 Stage 5

Implementado:

- StudioPlayer real;
- MediaCoordinator;
- play/pause;
- seek;
- mute;
- volume;
- keyboard;
- poster;
- proteção de playback principal;
- Showcase Hub;
- showcase 3D;
- showcase PDF;
- showcase HTML5 sandbox;
- build registry de showcases;
- health de showcases;
- fallbacks responsivos.

Owners:

```text
home.showcase_hub
studio.player
studio.model
studio.pdf
studio.html5
```

Resultados:

```text
Stage5 selftest: 91/91 PASS
App selftest: PASS
Showcase health: 4/4 configured PASS
Browser player controls: PASS
Responsive 1440..320: no horizontal overflow
WebGL fallback: PASS
GPU/WebGL físico Windows: ainda pendente
```

---

# 18. SERVIÇOS / ORÇAMENTO / BRIEFING

## 18.1 Stage 6

Owner do catálogo:

```text
services.catalog
```

Orçamento:

```text
forms.quote
```

Briefing:

```text
forms.briefing
```

## 18.2 QuoteWizard

Fluxo implementado em quatro passos:

```text
1. Serviços
2. Escopo
3. Prazo
4. Contato
```

Recursos:

- receipt;
- idempotency;
- status/read-back;
- HTTP validation;
- WhatsApp como fallback/saída comercial, não substituto do estado interno.

## 18.3 Briefing

O briefing deve permanecer independente do orçamento, preservando:

- configuração própria;
- estado próprio;
- upload quando aplicável;
- geração de PDF/registro quando aplicável;
- outbox/retry;
- read-back/status;
- histórico;
- idempotência.

## 18.4 Gate de zero perda

Durante o Stage 6 uma implementação intermediária de `server.py` que removeria funções foi rejeitada e **não promovida**.

O servidor cumulativo final preservou capacidades Stage 4 + Stage 5 + Stage 6.

Resultados:

```text
Stage6: 99/99 PASS
Briefing contract: 55/55 PASS
Stage5 regression: 91/91 PASS
App selftest: PASS
HTTP API: POST/status/idempotency/422 PASS
Browser functional: 28/28 PASS
Responsive: 1440/768/390/320 no horizontal overflow
```

---

# 19. IMMERSIVE V3.1 / WEBGL / SCROLL

## 19.1 Princípios

```text
ONE FRAME LOOP
ONE SCROLL CLOCK
PERSISTENT CANVAS
ISOLATED OWNERS
PROGRESSIVE ENHANCEMENT
MOBILE / REDUCED-MOTION FALLBACK
```

É proibido cada seção criar seu próprio `requestAnimationFrame` concorrente.

## 19.2 Stage 7

Implementado:

```text
#experience-canvas
FrameLoop
ScrollOrchestrator
SectionRegistry
Camera owner
Scene owner
PostFX owner
Quality owner
```

A experiência possui fallback quando WebGL não está disponível.

A runtime global legada de Hero/3D foi suprimida quando V3.1 está ativa, preservando estado legado para compatibilidade sem permitir dois motores concorrentes.

Resultados:

```text
Stage7: 83/83 PASS
Stage6 regression: 99/99 PASS
Stage5 regression: 91/91 PASS
App selftest: PASS
GPU/browser Windows físico: PENDING
```

---

# 20. PREVIEW

## 20.1 Estados

```text
EMPTY
BUILDING
READY
STALE
ERROR
```

## 20.2 Regra principal

**Preview precisa exibir o artefato real de Build.**

Não pode existir uma “prévia parecida” separada do site que será publicado.

## 20.3 Stage 8

Stage 8 adicionou:

- fingerprint canônico do estado;
- dirty real;
- no-op Save suppression;
- telemetry de dirty scope;
- Build determinístico;
- artifact identity;
- hosting exato em `/site/`;
- receipt;
- stale detection;
- Preview/Build parity.

---

# 21. BUILD DETERMINÍSTICO — ARTEFATO CERTIFICADO DO STAGE 8

Este é o ponto mais importante para a continuidade atual.

```text
status: PASS
build_id: V74-V75-EDITOR-MOTION-VIDEO
artifact_id: r22-7e8bf3667496-b184490130080817
artifact_sha256: b184490130080817b04c4128bfd01f382df0cbba6ac82dc4b982c02bafd38b35
editorial_revision: 7e8bf36674964235ffb7
artifact_hosted_path: /site/
preview_build_parity: PASS
determinism: PASS_TWO_IDENTICAL_BUILDS_SAME_ID_AND_SHA
```

## 21.1 Regra Stage 8 → Stage 9

O Stage 9 **não pode**:

- reconstruir silenciosamente um artefato diferente;
- publicar uma revisão diferente com o mesmo rótulo;
- publicar `main` atual por conveniência;
- substituir Preview por outro build sem recertificação.

O objetivo é publicar o **mesmo artefato testado**, ou recertificar formalmente uma nova revisão caso exista alteração autorizada.

---

# 22. TESTES DO STAGE 8

Resultados recuperados:

```text
Stage8 selftest: 39/39 PASS
Stage7 regression: 83/83 PASS
Stage6 regression: 99/99 PASS
Stage5 regression: 91/91 PASS
App selftest: PASS / exit 0
Preview parity: PASS
Two identical builds: PASS
```

Status oficial do Stage 8:

```text
PASS_WITH_REAL_GITHUB_WRITE_READBACK_PENDING_STAGE9_OR_WINDOWS
```

---

# 23. WORKING STATE RECUPERADO

O Working State canônico registrava:

```text
status = R2.2_STAGE8_PASS_STAGE9_AUTHORIZED_NOT_STARTED
completed_stages = 0..8
next_stage = 9 / GITHUB_PAGES_PUBLICATION
authorization = AUTHORIZED_NOT_STARTED
public_publish_authorized = true
windows_physical_validation = PENDING_FINAL
release_current_policy = DO_NOT_MODIFY_MSE2_RELEASE_CURRENT_UNTIL_FINAL_VALIDATION
credentials_policy = PRESERVE_BYTE_FOR_BYTE_NO_ROTATION_NO_LOGGING
```

Nesta continuidade esse estado lógico avançou para:

```text
R2.2_STAGE9_IN_PROGRESS_SOURCE_RECOVERY_GATE
```

A razão está detalhada na Seção 27.

---

# 24. STAGES R2.2 — QUADRO COMPLETO

| Stage | Domínio | Estado | Evidência principal |
|---|---|---|---|
| 0 | Freeze / baseline | PASS | base R2 integral, hash, roots, rollback |
| 1 | Contract Registry / owners / state | PASS | 13 contracts/locks, 33 owners, zero collision |
| 2 | Clean responsive shell | PASS técnico | 3-col/drawers/mobile, 1009 IDs, 0 duplicados, 9 viewports |
| 3 | HTML modular / Home / gallery | PASS | components/sections/registries, build 13/13 |
| 4 | Drive / Asset Registry | PASS conectado | list/download real, registry, health, read-only |
| 5 | Player / media / showcases | PASS técnico | 91/91, player real, PDF/HTML5/3D, fallback |
| 6 | Serviços / Quote / Briefing | PASS | 99/99, briefing 55/55, browser 28/28 |
| 7 | Immersive V3.1 | PASS técnico | 83/83, persistent canvas, one loop/clock |
| 8 | Save / Build / Preview | PASS | 39/39, deterministic artifact, exact parity |
| 9 | GitHub / Pages / Publication | **IN PROGRESS** | branch isolada + write/readback; bloqueado pela recuperação da revisão exata de `admin.js` |
| 10/final | Windows physical/release | PENDING | instalação, DPI, multi-monitor, GPU, network, publish live, rollback |

---

# 25. MSE2_RELEASE_CURRENT

O pointer atual foi deliberadamente mantido **inalterado** durante R2.2.

No freeze foi detectado que ainda apontava para:

```text
MSE2-EE12-R2.1-HARDENING-B-20260903
```

Isto é drift conhecido de pointer, não autorização para “corrigir” antecipadamente.

**Regra:** só atualizar `MSE2_RELEASE_CURRENT` depois de:

- regressão final;
- Stage 9 publicado e verificado;
- Windows físico;
- clean install smoke;
- upgrade smoke;
- artifact/hash/commit/buildId registrados;
- rollback disponível.

---

# 26. STAGE 9 — OPERAÇÃO EXECUTADA NESTA CONTINUIDADE

## 26.1 GitHub preflight isolado

Foi criada a branch:

```text
r22-stage9-candidate-20260904
```

Base da branch:

```text
b6bd9a71f235448bfe860af57ca5b537860c08c7
```

Foi criado e lido de volta:

```text
R2_2_STAGE9_PREFLIGHT.md
```

Commit de preflight:

```text
0017e13cc1995071cbed2f47cf8c5cf476ceae6c
```

Resultado:

```text
GitHub repository write: PASS
GitHub repository read-back: PASS
main modified: NO
production modified: NO
```

**Importante:** esta é prova do conector/repositório GitHub. A prova final do caminho de Save do aplicativo continua sujeita ao gate Windows/network.

## 26.2 Reconstrução física da base

As 13 partes foram baixadas e remontadas.

```text
Expected SHA:
085c145d5b0b3360c682ee297c3baf7eaba1a2bfa275b9a04044e02c59be1010

Reconstructed SHA:
085c145d5b0b3360c682ee297c3baf7eaba1a2bfa275b9a04044e02c59be1010

Result: MATCH
ZIP integrity: PASS
```

## 26.3 Overlays recuperados

Recuperados para reconstrução cumulativa:

```text
MSE2_PROGRAM_OVERLAY_R21_WINDOWS_VALIDATION.json
MSE2_PROGRAM_OVERLAY_R22_STAGE3_HTML_HOME_GALLERY.json
MSE2_PROGRAM_OVERLAY_R22_STAGE4_DRIVE_ASSET_REGISTRY.json
MSE2_PROGRAM_OVERLAY_R22_STAGE5_PLAYER_MEDIA_SHOWCASES.json
MSE2_PROGRAM_OVERLAY_R22_STAGE6_SERVICES_QUOTE_BRIEFING.json
MSE2_PROGRAM_OVERLAY_R22_STAGE7_IMMERSIVE_V31.json
MSE2_PROGRAM_OVERLAY_R22_STAGE8_SAVE_BUILD_PREVIEW.json
```

Stage 2 não introduziu um arquivo overlay cumulativo equivalente na pasta atual; suas alterações de shell (`admin.html/admin.css/admin.js`) foram posteriormente superseded pelos Stages 3–8. Seu relatório continua obrigatório como evidência de responsividade e estrutura.

## 26.4 Último-writer map

O union dos overlays recuperados contém aproximadamente **69 caminhos versionados** de código, contratos, testes e evidência.

No subconjunto runtime/public/editor, 35 arquivos diferem fisicamente da base R2 integral e precisam ser remontados para reproduzir o candidato Stage 8.

---

# 27. GATE DE INTEGRIDADE DESCOBERTO NO STAGE 9

## 27.1 Arquivo afetado

```text
static/admin.js
Drive file ID: 1gSs2EifCI5wraVOiKaPnwhLtlEKvtNjj
```

## 27.2 Valor certificado no Stage 8

```text
size: 1,137,301 bytes
sha256: 9ad368843b6afcf4492dd6da8a718c6aa6c8b60fe9d6733ad4ba69aacbbd0e44
```

## 27.3 Valor atual recuperado da pasta candidata

```text
size: 1,137,129 bytes
sha256: 769dca90ad1e250f40fd559371e07af5838bed4021e21bef55560cdb983d8c89
```

Resultado:

```text
MISMATCH
```

## 27.4 Prova pelo histórico de revisões do Drive

O histórico do arquivo comprova a sequência:

```text
2026-09-05T00:57:31.735Z
size = 1,137,301 bytes
→ revisão correspondente ao fechamento Stage 8

2026-09-05T03:02:31.496Z
size = 1,137,129 bytes
→ revisão posterior / arquivo atual
```

A revisão anterior exata ainda aparece no histórico do Drive.

## 27.5 Limitação encontrada

O conector disponível consegue listar a revisão anterior, porém o endpoint `fetch_file_revision` não consegue retornar o corpo para `application/javascript` e devolve erro de MIME não suportado.

Consequência:

```text
Não é seguro publicar agora.
```

Publicar o arquivo atual quebraria o contrato Stage 8:

```text
Preview tested artifact == Published artifact
```

## 27.6 Arquivos centrais já conferidos e sem drift

Nesta continuidade, os seguintes arquivos atuais foram baixados e comparados com o hash final esperado do respectivo overlay:

```text
app/asset_registry.py  → MATCH
app/config.py          → MATCH
app/drive_v6.py        → MATCH
app/exporter.py        → MATCH
app/server.py          → MATCH
app/state_v6.py        → MATCH
```

Até o checkpoint deste documento, o drift crítico comprovado é `static/admin.js`.

Isso não significa que os demais 28 arquivos do subconjunto runtime estejam automaticamente aprovados; eles ainda devem ser conferidos antes da publicação.

---

# 28. PLANO EXATO PARA RESOLVER O GATE DO `admin.js`

## Opção preferencial A — recuperar bytes da revisão Stage 8

Usar Google Drive API/Windows com credencial já existente no programa, sem imprimir segredo:

1. localizar `fileId = 1gSs2EifCI5wraVOiKaPnwhLtlEKvtNjj`;
2. localizar a revisão com `size = 1137301` e timestamp Stage 8;
3. baixar `revisions.get(..., alt=media)`;
4. salvar como arquivo temporário fora da pasta candidata;
5. calcular SHA-256;
6. aceitar somente se:

```text
9ad368843b6afcf4492dd6da8a718c6aa6c8b60fe9d6733ad4ba69aacbbd0e44
```

7. aplicar ao workspace de reconstrução Stage 9;
8. não sobrescrever a revisão atual no Drive durante o processo de prova;
9. continuar o last-writer map;
10. só depois reconstruir o Build.

## Opção B — localizar snapshot físico Stage 8

Pesquisar:

- evidence/cache local da execução Stage 8;
- export directory preservado;
- ZIP/checkpoint criado imediatamente após Stage 8;
- backup/versioned file no Windows;
- histórico local do Codex/workspace.

Aceitar somente por hash exato.

## Opção C — nova revisão recertificada

Usar apenas se a alteração posterior de `admin.js` for deliberada e desejada.

Nesse caso:

1. declarar Stage 8 anterior como baseline histórica;
2. gerar Stage 8.1/Stage 9 candidate com novo revision/hash;
3. executar novamente selftests Stage8 + regressões 7/6/5;
4. gerar novo Build determinístico duas vezes;
5. validar Preview;
6. obter novo artifact ID/SHA;
7. publicar esse novo artefato;
8. registrar que ele **não é** o `b1844901...` original.

Não fazer essa troca silenciosamente.

---

# 29. STAGE 9 — SEQUÊNCIA OPERACIONAL RESTANTE

Depois que o source drift estiver resolvido:

## 9.1 Reconstituir candidato cumulativo

```text
BASE R2 exata
+ R2.1 Windows candidate
+ Stage3
+ Stage4
+ Stage5
+ Stage6
+ Stage7
+ Stage8
```

Aplicar last-writer-wins **somente conforme manifests**, sempre verificando SHA.

## 9.2 Verificar source tree

Executar:

```text
python compileall
node --check static/admin.js
node --check public_assets/site.js
HTML parse / duplicate IDs
contract locks
app selftest
Stage5 regression
Stage6 regression
Stage7 regression
Stage8 selftest
```

## 9.3 Build determinístico

Rodar Build duas vezes com o mesmo state.

Esperado para reproduzir Stage 8:

```text
artifact_id = r22-7e8bf3667496-b184490130080817
artifact_sha256 = b184490130080817b04c4128bfd01f382df0cbba6ac82dc4b982c02bafd38b35
editorial_revision = 7e8bf36674964235ffb7
```

Se não reproduzir, **STOP** e identificar a primeira divergência.

## 9.4 Commit apenas na branch candidata

Commitar artefato/source necessários em:

```text
r22-stage9-candidate-20260904
```

Não tocar `main` ainda.

## 9.5 Preview/Pages candidato

Validar:

- index;
- rotas;
- asset paths;
- MIME;
- imagens;
- vídeos;
- StudioPlayer;
- PDF;
- HTML5;
- WebGL/fallback;
- serviços;
- quote;
- briefing;
- 404;
- mobile;
- no overflow;
- console errors;
- build ID.

## 9.6 Promote

Somente após PASS:

```text
candidate → main
```

Registrar commit exato.

## 9.7 Pós-publicação

Validar via HTTP/browser:

- status 200/expected 404;
- DOM do Home;
- buildId;
- revision;
- assets;
- mídia;
- player;
- forms;
- navigation;
- responsive;
- canonical/SEO;
- Pages health.

## 9.8 Rollback

Rollback point inicial preservado:

```text
b6bd9a71f235448bfe860af57ca5b537860c08c7
```

Se produção falhar, restaurar `main` para o commit anterior e registrar receipt de rollback.

---

# 30. WINDOWS PHYSICAL FINAL GATE

Antes de declarar R2.2 release final:

- clean install Windows;
- upgrade install;
- shortcut;
- `StudioFrame.exe`;
- startup;
- paths sem Codex temp dependency;
- DPI 100/125/150/200%;
- multi-monitor;
- resizing;
- Tree drawer;
- Inspector drawer;
- mobile Preview simulado;
- GPU/WebGL real;
- reduced motion;
- Drive auth/list/search/download real;
- GitHub auth/write/read-back real pelo aplicativo;
- Save real;
- Build real;
- Preview do mesmo artefato;
- Publish real;
- Pages real;
- HTTP live;
- DOM live;
- buildId live;
- rollback;
- restart após publicação;
- histórico/diagnóstico;
- segredo não aparece em log;
- antivírus/SmartScreen quando aplicável;
- assinatura/Authenticode permanece isolada do pipeline web.

---

# 31. CONTRATO DE PUBLICAÇÃO

State machine esperada:

```text
PREPARING
→ SAVING
→ VALIDATING
→ BUILDING
→ TESTING
→ ARTIFACT_READY
→ SENDING
→ PUBLISHING
→ VERIFYING
→ PUBLISHED
```

Estados de falha devem ser explícitos e recuperáveis.

Nunca deixar indefinidamente:

```text
Salvando...
Publicando...
```

Toda operação async deve possuir:

```text
START
PROGRESS
SUCCESS
ERROR
TIMEOUT
```

---

# 32. CONTRATO DE SEGURANÇA

## 32.1 Credenciais

- preservar byte a byte quando não houver autorização de rotação;
- não exibir conteúdo;
- não incluir em `.MD`, logs, commits públicos ou HTML;
- não incluir segredo em screenshot/evidence;
- não serializar segredo no frontend;
- não mover para GitHub Pages;
- não fazer “limpeza” que apague credenciais existentes;
- hashes de integridade podem ser usados internamente, mas valores secretos não.

## 32.2 Logs

Logs precisam ser sanitizados e ainda assim úteis para:

- operation id;
- owner;
- state transition;
- elapsed time;
- status code;
- artifact id;
- revision;
- erro sem segredo.

---

# 33. REGRAS ABSOLUTAS DE NÃO-REGRESSÃO

1. **Drive read-only** para origem de mídia.
2. **Player próprio**; nunca Drive Viewer como solução pública.
3. **Menu** vem da árvore/configuração do editor; categorias do portfólio não entram automaticamente no drawer.
4. **Categoria → Projeto → Mídia** deve permanecer íntegro.
5. **Save cloud-first** precisa de read-back.
6. **Build/Publish** usam snapshot exato.
7. **Preview = Build real**.
8. **Credenciais** nunca aparecem em público/log/evidência.
9. **Responsive** é reorganização real, não offset/hack.
10. **Uma função = um owner**.
11. **Não remover controles existentes** apenas para simplificar código.
12. **Não duplicar seção/owner/state**.
13. **Não marcar dirty por navegação**.
14. **Não autosalvar por simples troca de painel**.
15. **Não considerar arquivo presente como função implementada**.
16. **Não considerar selftest como aprovação visual do usuário**.
17. **Não sobrescrever ZIP/release anterior**.
18. **Sempre gerar nova identidade de release quando conteúdo mudar**.
19. **Rollback deve existir antes de promote**.
20. **MSE2_RELEASE_CURRENT só muda no fechamento final**.

---

# 34. TEST MATRIX MÍNIMA PARA CADA RELEASE

## 34.1 Código

```text
python compileall
node --check static/admin.js
node --check public_assets/site.js
HTML parser
CSS parser
no duplicate IDs
```

## 34.2 Editor

- Tree;
- Workspace;
- Inspector;
- resize;
- drawers;
- navigation no dirty;
- mutation dirty;
- save state;
- async timeout/error;
- theme separation.

## 34.3 Conteúdo

- Home;
- projects grid;
- project page;
- one-video project;
- image/lightbox;
- categories;
- services;
- quote;
- briefing.

## 34.4 Assets

- Drive health;
- list;
- search;
- download;
- MIME;
- registry;
- missing asset;
- cache conflict;
- Build health.

## 34.5 Media

- play;
- pause;
- seek;
- mute;
- volume;
- keyboard;
- poster;
- no Drive viewer;
- one principal playback;
- PDF;
- HTML5 sandbox;
- 3D/fallback.

## 34.6 Immersive

- single frame loop;
- single scroll clock;
- persistent canvas;
- section ownership;
- reduced motion;
- mobile;
- WebGL fallback;
- GPU real Windows.

## 34.7 Build/Preview

- deterministic build;
- same input → same ID/SHA;
- Preview receipt;
- stale detection;
- routes;
- assets;
- no console fatal;
- no horizontal overflow.

## 34.8 Publish

- candidate branch;
- commit hash;
- no secret;
- Pages/public hosting;
- HTTP;
- DOM;
- buildId;
- artifact hash;
- rollback.

---

# 35. EVIDÊNCIA OBRIGATÓRIA

Para cada alteração relevante, registrar:

```text
before
expected
implementation
files changed
hashes
selftests
regressions
browser QA
responsive QA
receipts
artifact ID
artifact SHA
commit
post-publish verification
rollback point
```

Quando visual, incluir captura antes/depois quando o ambiente permitir.

---

# 36. PACKAGE / RELEASE POLICY

Nunca sobrescrever pacote anterior.

Cada fechamento deve registrar:

```text
release_id
build_id
editorial_revision
artifact_id
artifact_sha256
git_commit
previous_release_id
created_at
validation summary
rollback reference
```

Somente depois atualizar `CURRENT`.

---

# 37. ESTADO DE FUNÇÕES — VISÃO CONSOLIDADA

## Certificadas tecnicamente até Stage 8

- clean responsive shell;
- owner/contract registry;
- modular Home HTML;
- project projection/registry;
- Drive read-only asset registry;
- asset health;
- StudioPlayer;
- MediaCoordinator;
- PDF showcase;
- HTML5 showcase;
- 3D showcase/fallback;
- services catalog;
- QuoteWizard;
- quote backend/receipt/idempotency/status;
- briefing preservado independente;
- Immersive V3.1 architecture;
- dirty fingerprint;
- Save state model;
- deterministic Build;
- Preview exact artifact/parity.

## Parcial / aguardando físico ou produção

- GPU/WebGL real Windows;
- final Windows responsive/DPI/multi-monitor;
- app-native GitHub network write/read-back;
- final Save cloud path em Windows;
- GitHub Pages/publication final;
- production HTTP/DOM verification;
- final rollback drill;
- final `MSE2_RELEASE_CURRENT` promote.

## Stage 9 em andamento

- GitHub branch isolation: PASS;
- repository connector write/read-back: PASS;
- base rebuild/hash: PASS;
- overlay recovery: PASS parcial;
- exact source recovery: **BLOCKED em `static/admin.js` revision bytes**;
- publish: NOT EXECUTED por proteção de integridade.

---

# 38. NÃO CONFUNDIR ESTES DOIS ESTADOS

## Estado do site hoje em `main`

É um site antigo na branch pública, head:

```text
b6bd9a71f235448bfe860af57ca5b537860c08c7
```

## Estado do ENGINE R2.2

É o candidato técnico Stage 8 com artefato certificado:

```text
r22-7e8bf3667496-b184490130080817
b184490130080817b04c4128bfd01f382df0cbba6ac82dc4b982c02bafd38b35
```

A missão do Stage 9 é promover o segundo com prova e rollback, não “editar o primeiro até parecer igual”.

---

# 39. RISCO PRINCIPAL ATUAL

O maior risco é uma publicação feita a partir da **pasta candidata atual**, porque houve alteração posterior ao Stage 8 em pelo menos `static/admin.js`.

Isto pode produzir:

- Build com hash diferente;
- Preview diferente do publicado;
- regressão visual/funcional;
- falsa continuidade;
- perda de auditabilidade;
- impossibilidade de provar o que foi testado.

A proteção correta é o gate de source recovery já ativado.

---

# 40. PLANO DE CONTINUIDADE PRIORIZADO

## Prioridade P0 — Integridade

1. recuperar bytes exatos da revisão Stage 8 de `static/admin.js`;
2. verificar SHA;
3. conferir todos os demais arquivos last-writer runtime;
4. montar source tree Stage 8 exato;
5. rodar selftests/regressões;
6. reproduzir artifact SHA `b1844901...`.

## Prioridade P1 — Stage 9

7. commit source/artifact em candidate branch;
8. preview candidate;
9. browser QA;
10. promote controlado para `main`;
11. Pages/live verification;
12. rollback drill.

## Prioridade P2 — Windows final

13. instalar candidato em Windows real;
14. validar DPI/multi-monitor/GPU/network;
15. validar Drive/GitHub pelo aplicativo;
16. Save→Build→Preview→Publish end-to-end;
17. clean install + upgrade;
18. gerar release final.

## Prioridade P3 — Promote canônico

19. registrar release manifest;
20. registrar commit/artifact/hash;
21. atualizar `MSE2_RELEASE_CURRENT`;
22. congelar checkpoint final.

---

# 41. STOP CONDITIONS

Parar imediatamente antes de promover/publicar se ocorrer qualquer um:

- hash de source divergente;
- artifact SHA divergente sem nova recertificação;
- Preview != Build;
- segredo detectado em output público;
- regression Stage5/6/7/8;
- route critical failure;
- player usa Drive viewer;
- Save sem read-back;
- publish sem commit/artifact identity;
- Pages retorna build antigo após promote;
- horizontal overflow em viewport suportado;
- WebGL sem fallback;
- quote/briefing sem estado/status;
- rollback não disponível.

---

# 42. FONTE EDITORIAL E DADOS — POLÍTICA DE PRESERVAÇÃO

Arquivos/pastas de dados que não podem ser descartados durante upgrade/rebuild:

```text
project-state/
user-data/
local-assets/
uploads/
```

Também preservar:

- estado cloud;
- receipts;
- logs sanitizados;
- histórico;
- configurações do editor;
- seleção de temas;
- árvore;
- projetos;
- mídias;
- serviços;
- quote;
- briefing;
- SEO;
- page builder;
- asset registry.

---

# 43. LEGADO QUE CONTINUA VÁLIDO QUANDO NÃO CONFLITA

Da linha StudioFrame V7.12.x continuam relevantes:

- `studioframe-state` como fonte cloud operacional;
- Drive read-only;
- `main` como host público;
- vídeos fora de GitHub como solução padrão quando o pipeline exige mídia do Drive;
- player `<video>` próprio;
- menu configurado pelo editor;
- categorias na barra de Home, não injetadas automaticamente no drawer;
- Save com read-back;
- Build/Publish no mesmo snapshot;
- budgets/limits e guards de publicação;
- logs sanitizados;
- versão nova para cada pacote;
- Authenticode isolado do Save/Build/Publish web.

---

# 44. CONTEXTO DE UX QUE NÃO DEVE SER PERDIDO

Erros que já foram rejeitados e não podem reaparecer:

- sidebar imóvel;
- painel espremido;
- textos sobrepostos;
- botão sem ação;
- botão que diz sucesso sem efeito real;
- seção vazia;
- seção duplicada;
- recurso 3D “presente” mas não renderizado;
- Preview separado do Build;
- Save travado em loading;
- auto-save disparado pela navegação;
- tema do editor alterando o site;
- theme controls espalhados em owners diferentes;
- assets importados mas não bindados;
- menu misturando categorias automaticamente;
- player baseado em Drive Viewer;
- publicação sem read-back/HTTP/live proof.

---

# 45. SESSÃO ATUAL — LOG DE CONTINUIDADE

Executado nesta recuperação:

```text
[PASS] Recuperação de master continuity / R2.2 plan
[PASS] Recuperação de reports Stage0..Stage8
[PASS] Recuperação do Working State
[PASS] Recuperação da base R2 / 13 partes
[PASS] Remontagem da base / SHA exato
[PASS] ZIP integrity test
[PASS] Leitura do GitHub main
[PASS] Leitura do studioframe-state
[PASS] Criação da branch r22-stage9-candidate-20260904
[PASS] Commit de R2_2_STAGE9_PREFLIGHT.md
[PASS] Read-back do preflight
[PASS] Recuperação dos overlays R2.1 + R2.2 Stage3..8
[PASS] Verificação de app/asset_registry.py
[PASS] Verificação de app/config.py
[PASS] Verificação de app/drive_v6.py
[PASS] Verificação de app/exporter.py
[PASS] Verificação de app/server.py
[PASS] Verificação de app/state_v6.py
[FAIL-CLOSED] static/admin.js atual diverge do Stage8
[PASS] Histórico de revisões confirma versão Stage8 exata existente
[BLOCKED] Endpoint disponível não baixa revisão JS antiga
[NOT EXECUTED] Promote para main
[NOT EXECUTED] Publicação Pages
```

O `FAIL-CLOSED` é comportamento correto: o sistema se recusou a tratar drift como sucesso.

---

# 46. ESTADO FINAL DESTE HANDOFF

```text
PROJECT = ENGINE MENSAGEM STUDIO / EMS EDITOR / EE12
LINE = R2.2
COMPLETED = STAGE 0..8
CURRENT = STAGE 9
STAGE9 = IN_PROGRESS
PUBLICATION_AUTHORIZATION = EXISTS
PUBLICATION_EXECUTED = NO
REASON = EXACT_STAGE8_SOURCE_RECOVERY_GATE
MAIN_TOUCHED = NO
CANDIDATE_BRANCH = r22-stage9-candidate-20260904
BASE_SHA = MATCH
STAGE8_ARTIFACT_SHA = b184490130080817b04c4128bfd01f382df0cbba6ac82dc4b982c02bafd38b35
SOURCE_DRIFT = static/admin.js
ROLLBACK = b6bd9a71f235448bfe860af57ca5b537860c08c7
MSE2_RELEASE_CURRENT = DO_NOT_CHANGE_YET
WINDOWS_FINAL = PENDING
```

---

# 47. PRÓXIMA AÇÃO CANÔNICA

A continuação deve começar **exatamente** aqui:

```text
RECOVER static/admin.js Stage8 revision bytes
→ verify SHA 9ad368843b6a...
→ finish last-writer source verification
→ reconstruct exact Stage8 source tree
→ run Stage8 + Stage7 + Stage6 + Stage5 regressions
→ build twice
→ require artifact SHA b18449013008...
→ commit candidate
→ candidate preview
→ publish main
→ live verify
→ Windows physical final
→ update CURRENT
```

Não voltar para Stage 0.  
Não recriar a arquitetura.  
Não publicar o `admin.js` atual sob o identity do Stage 8.  
Não remover dados para “facilitar” a montagem.

---

# 48. INVENTÁRIO DE EVIDÊNCIAS PRINCIPAIS

## Freeze/base

```text
R2_2_STAGE0_IMPLEMENTATION_REPORT.md
FULL_SHA256.txt
MSE2_EE12_WEB_STARTER2_CANONICAL_FULL_PROGRAM_20260903.zip.part00..12
```

## R2.1

```text
MSE2_PROGRAM_OVERLAY_R21_WINDOWS_VALIDATION.json
MSE2_R21_WINDOWS_VALIDATION_CANDIDATE_CERTIFICATION_20260903.txt
```

## Stage 3

```text
MSE2_PROGRAM_OVERLAY_R22_STAGE3_HTML_HOME_GALLERY.json
R2_2_STAGE3_IMPLEMENTATION_REPORT.md
```

## Stage 4

```text
MSE2_PROGRAM_OVERLAY_R22_STAGE4_DRIVE_ASSET_REGISTRY.json
R2_2_STAGE4_IMPLEMENTATION_REPORT.md
```

## Stage 5

```text
MSE2_PROGRAM_OVERLAY_R22_STAGE5_PLAYER_MEDIA_SHOWCASES.json
R2_2_STAGE5_IMPLEMENTATION_REPORT.md
```

## Stage 6

```text
MSE2_PROGRAM_OVERLAY_R22_STAGE6_SERVICES_QUOTE_BRIEFING.json
R2_2_STAGE6_IMPLEMENTATION_REPORT.md
```

## Stage 7

```text
MSE2_PROGRAM_OVERLAY_R22_STAGE7_IMMERSIVE_V31.json
R2_2_STAGE7_IMPLEMENTATION_REPORT.md
```

## Stage 8

Evidence folder:

```text
R2_2_STAGE_8_SAVE_BUILD_PREVIEW_PARITY
ID: 1RPz4PfnHQVYB1blaCXBB4aClZvROiCnQ
```

Conteúdo recuperado:

```text
R2_2_STAGE8_IMPLEMENTATION_REPORT.md
R2_2_STAGE8_BUILD_RECEIPT.json
R2_2_STAGE8_HASH_RECEIPT.json
R2_2_STAGE8_GATE_RECEIPT.json
R2_2_STAGE8_PREVIEW_BUILD_PARITY.json
R2_2_STAGE8_PREVIEW_RECEIPT.json
MSE2_R22_STAGE8_SAVE_BUILD_PREVIEW_CONTRACT.md
MSE2_PROGRAM_OVERLAY_R22_STAGE8_SAVE_BUILD_PREVIEW.json
R2_2_STAGE8_APP_SELFTEST.json
R2_2_STAGE8_STAGE7_REGRESSION.json
R2_2_STAGE8_STAGE6_REGRESSION.json
R2_2_STAGE8_STAGE5_REGRESSION.json
```

## Stage 9 criado nesta continuidade

```text
GitHub branch: r22-stage9-candidate-20260904
File: R2_2_STAGE9_PREFLIGHT.md
Commit: 0017e13cc1995071cbed2f47cf8c5cf476ceae6c
```

---

# 49. CHECKLIST DE HANDOFF PARA OUTRO CHAT/AGENTE/CODEX

Antes de tocar código, o próximo agente deve responder internamente SIM a todos:

```text
[ ] Sei que a linha atual é R2.2 Stage9, não V9.1.1.
[ ] Sei o SHA da base R2.
[ ] Sei o artifact SHA Stage8.
[ ] Sei que main ainda está no build antigo.
[ ] Sei que existe branch candidata Stage9.
[ ] Sei que static/admin.js sofreu drift pós-Stage8.
[ ] Sei que a revisão exata Stage8 existe no version history.
[ ] Sei que não posso publicar o source atual como Stage8.
[ ] Sei que CURRENT não deve ser alterado ainda.
[ ] Sei que Windows físico continua pendente.
[ ] Sei que Drive é read-only para mídia.
[ ] Sei que player próprio é obrigatório.
[ ] Sei que Preview deve ser o Build real.
[ ] Sei que Save exige read-back.
[ ] Sei que Recovery não é fluxo normal.
[ ] Sei que credenciais não podem aparecer em logs/output.
```

Se qualquer resposta for NÃO, reler este arquivo antes de continuar.

---

# 50. DECLARAÇÃO DE CONTINUIDADE

Este checkpoint substitui a necessidade de reconstruir o estado do projeto por lembrança de conversa.

A continuidade canônica é:

> **ENGINE MENSAGEM STUDIO / EMS EDITOR / EE12 — R2.2 — Stage 9 em andamento, com produção preservada, base integral validada, GitHub preflight concluído e publicação bloqueada de forma intencional até recuperar/reproduzir exatamente o source e o artefato certificados do Stage 8.**

