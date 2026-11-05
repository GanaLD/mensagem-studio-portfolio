# Google Ads API — integração direta de escrita (Mensagem Studio)

Alvo exclusivo: conta 9877007101, Performance Max 24423699562, grupo 6767362372.
Orçamento R$1/dia (1.000.000 micros), proibido modificar. Domínio exclusivo https://mensagemstudio.shop.
**Status: integração implementada no GitHub; não equivale a mudanças já aplicadas no Ads.**

## Rota

O arquivo scripts/google-ads-direct.mjs usa a REST API v26 para:
1. Verificar conta, moeda, orçamento e alvos exatos antes da primeira mutação.
2. Configurar campanha, presença física, raio Curitiba 35 km, nome e URL final do grupo /servicos/.
3. Substituir 11 textos do grupo por ID e texto antigos; bloquear divergências e duplicatas.
4. Importar 4 imagens PNG privadas pelo Google Drive usando IDs já autorizados no planejamento.
5. Verificar novamente os recursos e configurações publicados; imprimir APLICADO_E_VERIFICADO somente se tudo passar.

ops/google-ads/plan.json define o plano exato. ops/google-ads/execute.json define a aprovação de execução. A workflow GitHub Actions em .github/workflows/google-ads-direct.yml roda testes, confere autorização e dispara a execução quando execute.json é atualizado na branch principal ou quando se confirma Run workflow / execute YES. O programa não faz instalação local; não mexe no cursor ou no NVMe.

## Autorizar UMA VEZ a nova integração

A conexão atual do Metricool tem credenciais próprias e não concede acesso à API para GitHub/ChatGPT. Não é seguro nem tecnicamente suportado extrair/reutilizar tokens privados dessa integração.

O acesso à API Google Ads agora está associado ao projeto Google Cloud (alteração de setembro/2026). É possível solicitar nível Explorer, que permite operações em contas reais, sujeito à aprovação.

1. No Google Cloud, habilitar Google Ads API para o projeto da Mensagem Studio e obter Explorer ou superior.
2. Criar credenciais OAuth do projeto e autorizar a conta Google com escopos: https://www.googleapis.com/auth/adwords e https://www.googleapis.com/auth/drive.readonly.
3. Gerar refresh token OFFLINE via fluxo OAuth oficial.
4. Salvar somente em GitHub repository Settings > Secrets and variables > Actions:
   GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, GOOGLE_ADS_REFRESH_TOKEN.
   GOOGLE_ADS_LOGIN_CUSTOMER_ID é opcional e só se houver conta de administrador MCC.
5. Acionar manualmente uma vez Run workflow com execute=YES, ou editar o execute.json na main para disparo por push. Depois disso, atualizações futuras são gerenciáveis pela integração sem editar RAW.
Não enviar nenhum token no chat, não incluí-lo no GitHub em texto e não presumir que permissões do Metricool equivalem às do projeto Cloud.

## Segurança e operação

As chamadas de mutação só aceitam customer 9877007101, campaign 24423699562, asset group 6767362372 e orçamento exatamente R$1. Não permitem criação/ativação de campanha, nem mudança no cartão, no orçamento ou no domínio .com.br. Os testes são executados sem acesso à conta. Resultado de testes PASSED não significa implantação na conta.

O MCP oficial google-ads-mcp é SOMENTE LEITURA em novembro/2026, portanto não atende à necessidade de editar; esta integração usa API REST diretamente.

## Fontes
- https://developers.google.com/google-ads/api/docs/api-policy/access-levels
- https://developers.google.com/google-ads/api/docs/oauth/overview
- https://developers.google.com/google-ads/api/rest/common/mutate
- https://developers.google.com/google-ads/api/performance-max/asset-requirements
- https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server

Para uso local futuro, todo o projeto deve ficar apenas em E:\ARQUIVOS DO CHAT GPT E 3D\MARKETING_AI\ de acordo com manual SATA3. Nenhuma instalação local foi realizada nesta implementação.

## Correção OAuth - 04/11/2026

Já existe um cliente OAuth de desktop do projeto Google Cloud Mensagem Studio: project-72069d50-38bb-4cfd-acd (número 680171140600). A aprovação Explorer foi informada em 31/10/2026; não criar outro projeto nem alterar faturamento.

Arquivos já estabelecidos no SATA3:
- E:\ARQUIVOS DO CHAT GPT E 3D\MARKETING_AI\CREDENCIAIS_PRIVADAS\google-ads-oauth-client-id.txt
- E:\ARQUIVOS DO CHAT GPT E 3D\MARKETING_AI\CREDENCIAIS_PRIVADAS\google-ads-oauth-client-secret.txt
- Alternativa: CHAVE API ADS.json na mesma pasta com seção installed.

O bloqueio do GitHub Actions foi comprovado: o job apply não encontrou GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET e GOOGLE_ADS_REFRESH_TOKEN. Google Ads Scripts e Metricool têm autorizações próprias, não transferíveis. Nenhum refresh token de usuário foi confirmado até aqui.

### Autorização oficial única no Windows, sem instalar no NVMe

O código scripts/google-ads-oauth-bootstrap.mjs (Node 20+, sem dependências de NPM) lê as credenciais existentes no SATA3, cria servidor local restrito a 127.0.0.1 e gera URL de consentimento oficial accounts.google.com com CSRF state e PKCE. O usuário aprova dois escopos: adwords para editar a conta e drive.readonly para importar os quatro PNGs.

Após o consentimento, troca o authorization code por refresh token, valida os escopos, lê a conta 9877007101 em BRL pela API oficial v26 e armazena o token apenas em E:\ARQUIVOS DO CHAT GPT E 3D\MARKETING_AI\CREDENCIAIS_PRIVADAS\google-ads-refresh-token.txt. Não imprime segredos.

A integração tenta cadastrar os segredos privados no GitHub Actions via gh CLI já autenticado (GH_CONFIG_DIR no SATA3). Se o gh não estiver autenticado, isso não bloqueia a execução local da API; a aplicação ocorre diretamente em scripts/google-ads-direct.mjs --inspect e --apply, com verificações de nomes, URL, geografia, quatro imagens, onze textos e orçamento R$1/dia.

Executável auxiliar: scripts/configurar-google-ads-oauth-sata3.ps1. Ele baixa os scripts e plano públicos da branch main exclusivamente no SATA3, faz backup dos arquivos de código anteriores no próprio SATA3, e chama o autorizador com --apply --sync-gh.

Comando de inicialização única a partir do PowerShell do Windows (a etapa de consentimento é intransferível):

    $dir = 'E:\ARQUIVOS DO CHAT GPT E 3D\MARKETING_AI\scripts'
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/GanaLD/mensagem-studio-portfolio/main/scripts/configurar-google-ads-oauth-sata3.ps1' -OutFile (Join-Path $dir 'configurar-google-ads-oauth-sata3.ps1')
    powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $dir 'configurar-google-ads-oauth-sata3.ps1')

É necessário Node 20+ já disponível no PATH ou em instalação portátil no SATA3. O instalador não modifica C:, não controla o cursor, não cria campanhas nem modifica o cartão.

Um OAuth client External com estado Testing pode produzir refresh tokens válidos por apenas 7 dias; para longa duração, verificar a elegibilidade de publicação In production no Google Auth Platform. Não criar segunda conta ou projeto para contornar autorização.

A API Google Ads descontinuou developer tokens em 09/09/2026; a autorização agora é verificada pelo projeto Google Cloud do OAuth. Não inserir developer-token obrigatório no código novo.

Status: bootstrap e testes preparados no GitHub; OAuth do usuário e execução real na conta ainda dependem de consentimento e execução em host conectado. Apenas resultado APLICADO_E_VERIFICADO do Google Ads encerra o trabalho.
