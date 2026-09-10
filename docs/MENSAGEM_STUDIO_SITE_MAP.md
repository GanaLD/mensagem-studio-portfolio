# MENSAGEM STUDIO — SITE / MAPA E CONSTRUÇÃO

**Snapshot funcional de referência:** `25c8f995e173d3035225afa9f44baaed8fbd8764`  
**Repositório:** `GanaLD/mensagem-studio-portfolio`  
**Escopo do pacote:** `wix-preview/`  
**Homologação:** https://mensagemstudio.shop/wix-preview/

## 1. Objetivo

Este documento descreve a construção do preview atual do Mensagem Studio, o mapa de páginas, a arquitetura de interação, os arquivos centrais, as dependências externas e as regras de manutenção.

## 2. Mapa do site

### Páginas principais
- Home — `/wix-preview/`
- Serviços — `/wix-preview/servicos/`
- Portfólio — `/wix-preview/portfolio/`

### Subpáginas de projetos
- `/wix-preview/portfolio/carrossel-banner-estetica/`
- `/wix-preview/portfolio/creatina-growth/`
- `/wix-preview/portfolio/edicao-fantasia-photoshop/`
- `/wix-preview/portfolio/edicao-podcast-workshop/`
- `/wix-preview/portfolio/esporte-fitness/`
- `/wix-preview/portfolio/fotos-para-ecommerce/`
- `/wix-preview/portfolio/motion-banner-cartaz-cinematografico/`
- `/wix-preview/portfolio/motion-ia-video-campanhas/`
- `/wix-preview/portfolio/motors-vans/`
- `/wix-preview/portfolio/personagens-consistentes-com-ia/`
- `/wix-preview/portfolio/poster-cartaz/`
- `/wix-preview/portfolio/produto-3d-egeo/`
- `/wix-preview/portfolio/suco-laranja-natural-one/`

## 3. Mapa da Home

Fluxo estrutural atual:

**HeroScroll → Serviços → Narrativa / WordScroll → Background global → PDF Showcase → 3D Showcase → Projetos → Motion / YouTube → Briefing / Ação → Rodapé**

## 4. HeroScroll

A Home usa uma seção longa com vídeo sticky. O deslocamento vertical é convertido em tempo do vídeo. A primeira fase mantém o filme como foco principal; depois do limiar configurado no runtime, entram os cases.

No mobile há uma resposta de scrub mais rápida para reduzir o atraso entre o gesto e o frame exibido.

## 5. Serviços

A Home usa uma vitrine visual para as áreas de serviço:

- desktop: carrossel/vitrine 3D;
- mobile: coverflow controlado;
- navegação por setas;
- suporte a arraste/swipe;
- cards direcionando para a página geral de Serviços.

## 6. Narrativa / WordScroll

A seção narrativa funciona como transição entre Serviços e o conteúdo downstream. Ela utiliza vídeo de fundo e troca de palavras para apresentar os campos de atuação do estúdio.

## 7. Background global imersivo

Depois da seção narrativa, a Home mantém uma camada visual global atrás das seções posteriores.

No snapshot atual, a Home utiliza `assets/cyber-angel-bg.html` dentro de um iframe e envia progresso de scroll para essa cena por `postMessage`.

O arquivo `assets/imperial-asian-estate.glb` permanece preservado no diretório como asset do projeto, mas pode não estar ativo no runtime atual.

## 8. Showcases

### PDF
Utiliza iframe/visualizador para documentos externos.

### 3D
Utiliza `model-viewer` e assets servidos por endpoint externo.

### Motion / YouTube
Utiliza embeds de vídeo. O showcase principal foi ajustado para privilegiar o processo criativo.

### Projetos
Cards de portfólio direcionam para subpáginas individuais.

## 9. Portfólio e subpáginas

Cada case possui uma pasta própria em:

`wix-preview/portfolio/<slug>/index.html`

As páginas compartilham:

- `portfolio/project-page.js` — renderização da página;
- `portfolio/project-page.css` — layout responsivo;
- `portfolio/project-data.js` — base central de títulos, descrições, capas, vídeos e arrays de mídia.

Esse desenho evita duplicação da lógica da galeria em cada case.

## 10. Briefing / Ação

O bloco final apresenta:

- processo de atendimento;
- Serviços;
- Briefing;
- Atendimento/WhatsApp.

O conteúdo do processo foi retirado do sistema de blur/reveal para permanecer nítido tanto no desktop quanto no mobile.

## 11. Arquivos principais

- `wix-preview/index.html` — Home e lógica principal do HeroScroll.
- `wix-preview/catalog-sync.js` — entrypoint dos módulos da Home.
- `wix-preview/home-runtime.js` — catálogo/carrossel de Serviços.
- `wix-preview/home-round2.js` — interações, setas, mobile e indicador de scroll.
- `wix-preview/home-round2d.js` — Briefing/Ação.
- `wix-preview/scroll-reveal.js` — reveals das áreas downstream.
- `wix-preview/pdf-click-viewer.js` — showcase PDF.
- `wix-preview/portfolio/project-data.js` — dados/mídias dos cases.
- `wix-preview/portfolio/project-page.js` — renderer dos cases.
- `wix-preview/portfolio/project-page.css` — layout dos cases.
- `wix-preview/assets/cyber-angel-bg.html` — cena imersiva.
- `wix-preview/assets/imperial-asian-estate.glb` — asset 3D preservado.

## 12. Dependências externas

Parte das mídias não é duplicada localmente. O código atual consulta referências externas como:

- Wix Static Media;
- YouTube;
- Google Drive;
- endpoints Supabase;
- Google Model Viewer via CDN.

O pacote preserva essas referências. Para reproduzir 100% do conteúdo visual, o ambiente precisa de internet e as fontes externas precisam continuar disponíveis.

## 13. Execução local

Não é recomendado abrir o `index.html` diretamente por `file://`, porque o projeto usa ES modules e integrações web.

Na pasta que contém `wix-preview/`:

```bash
python -m http.server 8080
```

Depois:

`http://localhost:8080/wix-preview/`

## 14. Responsividade

Os breakpoints principais do preview estão concentrados em 1024 px e 760 px.

No mobile, o projeto possui tratamentos específicos para:

- HeroScroll;
- scrub do vídeo;
- affordance de touch/scroll;
- coverflow de Serviços;
- grids verticais;
- botões e cards;
- prevenção de overflow horizontal.

## 15. Regras de manutenção

1. Não alterar a lógica aprovada do HeroScroll sem teste específico.
2. Separar sempre deploy técnico de aprovação visual.
3. Validar desktop e mobile separadamente.
4. Evitar sobreposição, blur involuntário e overflow horizontal.
5. Ao alterar módulos da Home, atualizar o cache-bust/versionamento.
6. Manter `project-data.js` como fonte central dos cases.
7. Não assumir que um asset preservado no diretório está necessariamente ativo no runtime.
8. Preservar as URLs e dependências externas enquanto não forem migradas para armazenamento local.

## 16. Publicação

O preview é publicado por GitHub Pages no domínio:

`https://mensagemstudio.shop/wix-preview/`

O ZIP de backup deve ser tratado como snapshot para:

- backup;
- homologação;
- manutenção;
- migração;
- auditoria da estrutura;
- recuperação do HTML e dos módulos.

## 17. Estrutura esperada do pacote

```text
MENSAGEM_STUDIO_SITE_PACKAGE/
├── SITE/
│   └── wix-preview/
│       ├── index.html
│       ├── servicos/
│       ├── portfolio/
│       ├── assets/
│       └── *.js
├── DOCUMENTACAO/
│   ├── MENSAGEM_STUDIO_SITE_MAP.md
│   └── MANIFESTO_ARQUIVOS.txt
└── README_PACKAGE.txt
```

O manifesto registra os arquivos efetivamente incluídos no momento em que o pacote é gerado.
