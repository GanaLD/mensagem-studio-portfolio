# MENSAGEM IMMERSIVE WEB V5 — DEVELOPMENT BRANCH

Branch: `immersive-v5-assets`

## Objetivo

Evoluir o HTML atual para uma V5 com:

- Hero em vídeo controlado por scroll usando `VÍDEO PARA HERO.mp4`;
- grid com **uma capa por pasta de projeto** a partir das duas origens do Google Drive;
- runtime WebGL/3D isolado e biblioteca de GLBs registrada;
- showcase do PDF `MENSAGEM_STUDIO_MANUAL_COMPLETO_V3_LOGO_UNICA_64P.pdf`;
- serviços alinhados ao manual de marca;
- orçamento e briefing reutilizando as rotas canônicas existentes;
- responsividade e zero-overlap como gates de release.

## Arquivos V5

```text
v5/
├── index.html
├── styles.css
├── app.js
└── data/
    ├── v5-manifest.json
    └── projects-v5.json
```

## Owners

```text
home.hero       -> Hero scroll-video
home.projects   -> grid de projetos
studio.model    -> showcase 3D
studio.pdf      -> showcase PDF
forms.quote     -> /orcamento/
forms.briefing  -> /briefing/
```

## Project Registry

`data/projects-v5.json` contém 26 projetos de nível superior. Cada projeto recebe exatamente um `coverFileId`; subpastas e demais mídias não são multiplicadas no grid.

## Estado dos binários

Os binários fornecidos estão registrados por ID do Google Drive e usados como fontes de desenvolvimento remotas. A materialização final no artefato local deverá usar:

```text
/assets/v5/hero/video-para-hero.mp4
/assets/v5/showcase/MENSAGEM_STUDIO_MANUAL_COMPLETO_V3_LOGO_UNICA_64P.pdf
/assets/v5/3d/*.glb
```

A branch NÃO declara esses binários como localmente materializados enquanto eles não estiverem fisicamente no repositório/artefato e validados no runtime.

## Gates antes de promoção

1. Materializar MP4/PDF/GLBs no build final.
2. Executar readback/hashes dos binários e fontes.
3. Testar Hero por scroll nos viewports obrigatórios.
4. Confirmar 26 capas carregando sem quebra.
5. Confirmar projeto interno/galeria sem transformar mídias em projetos.
6. Trocar o preview remoto do PDF pelo player/canvas canônico se o runtime final exigir PDF.js local.
7. Validar 3D final com GLB real, fallback e reduced-motion.
8. Validar Orçamento e Briefing nas rotas existentes.
9. Executar matriz zero overlap, zero clipping e zero horizontal overflow.
10. Preview = Build e somente então promover/publicar.

## Status

`SOURCE_BRANCH_WRITTEN` + `REMOTE_ASSET_REGISTRY_WRITTEN`.

Não é `FINAL_PASS`: materialização binária e validação física/runtime ainda são gates pendentes.
