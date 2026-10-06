# Casa no HERO SCROLL

A casa acrescenta o quarto item ao viewport unificado da Home: cena inicial 3D/vídeo, case do personagem, case da arma e casa explorável. Os três itens existentes mantêm suas distâncias de scroll, medidas no layout atual.

O trecho da casa acrescenta 400svh ao `#hero`. O controlador existente `renderScroll` avança uma timeline GSAP pausada: a casa entra pela direita nos primeiros 15% desse trecho. Entre 15% e 88%, o scroll controla o percurso aéreo; a chegada permanece parada nos 12% finais.

Na chegada, a pessoa escolhe **Andar no ambiente** ou **Continuar pela página**. A exploração usa W/A/S/D, arraste para olhar, V para alternar a câmera, E para interagir e Shift para correr a 3,5 m/s. A caminhada permanece em 1,633 m/s. **Voltar ao scroll**, Escape e rolagem permitem retornar à página.

O iframe `/assets/casa-hero/index.html?embed=hero4` recebe o progresso do pai e não inicia um sobrevoo automático nem cria outro relógio de scroll. A renderização pausa quando a casa está fora do trecho ativo. A demonstração independente mantém sua abertura automática.

Os arquivos CASA_HERO.glb e PLAYER.glb preservam materiais e texturas incorporados. Ondas animadas, controles e interações são executados pelo HTML. O personagem e o boné ficam ocultos em primeira pessoa.

O módulo do pai fica em `assets/casa-hero-host.mjs`, com o estilo de interface em `assets/casa-hero-host.css`. O iframe aceita mensagens somente da janela pai na mesma origem. A Home continua usando o viewport `#msUnifiedHeroStage` já existente. O ScrollTrigger de `#word` no desktop é recalculado após a extensão de altura, carregamento e fontes. No celular, o controlador existente de `scroll-reveal.js` continua responsável pelos cases de `#word`.

Esta implementação é aditiva no código atual de mensagemstudio.shop. Os arquivos do Wix em mensagemstudio.com.br não fazem parte desta alteração.

A revisão local passou 36 conferências no navegador, em 1366×768 e 390×844, incluindo entrada GSAP, câmera reversível pelo scroll, escolha final, caminhada, corrida, toque, saída e preservação dos itens anteriores. Foram examinadas capturas das duas larguras. O resumo com as identidades dos arquivos está em `CASA_HERO_QA.json`. A conferência móvel usa emulação; desempenho em telefone físico e a aceitação de todos os materiais e colisões do ambiente não fazem parte desse teste de integração.
