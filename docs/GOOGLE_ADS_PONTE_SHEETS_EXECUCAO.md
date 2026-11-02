# Mensagem Studio — integração gratuita Google Ads ↔ Google Sheets

**Última revisão:** 2026-11-02
**Conta Google Ads:** `987-700-7101`
**Campanha identificada:** `24423699562` — `Campaign #1`
**Tipo:** `PERFORMANCE_MAX` — `MAXIMIZE_CONVERSIONS`
**Orçamento atual observado:** R$ 1/dia (NÃO aumentar)
**Planilha:** https://docs.google.com/spreadsheets/d/1363h3mmB7mCiS6BJoHD6311qDrRoIILhRScDfokSEM8/edit
**Script versionado:** `scripts/google_ads_sheets_bridge.gs`

## O que já funcionou na conta real

O usuário autorizou e executou o primeiro script no console Google Ads em 02/11/2026. A aba `CAMPANHAS` foi preenchida às 16:30:16, horário de São Paulo, com os resultados reais dos últimos 30 dias:

- Campanha `24423699562`, ativa, Performance Max.
- R$ 1 de orçamento médio diário.
- 89 impressões, 4 cliques, R$ 2,213094 de custo, 3 conversões cadastradas.
- Não é possível presumir que as três conversões sejam leads reais; é necessária auditoria.

**A integração de leitura já funciona; não voltar a pedir autorização como se estivesse pendente sem evidência.**

## Estrutura da planilha

- `CONFIG`: fixa a conta Google Ads, a campanha, o teto diário de segurança e desliga execuções de comandos.
- `CAMPANHAS`: status, orçamento, desempenho.
- `DIAGNOSTICO`: achados e próximos passos.
- `GRUPOS_RECURSOS`: asset groups e URLs da PMax.
- `RECURSOS`: assets criativos e desempenho de recursos.
- `CONVERSOES`: categorias e ações que podem contar como conversão.
- `METAS`: metas de conversão usadas na estratégia de lances.
- `LOCALIZACOES`: regiões incluídas e excluídas.
- `CONFIG_PMAX`: definições geográficas e expansão de URL.
- `COMANDOS`: comandos futuros, nunca executados sem habilitação.
- `LOG`: resultados e erros de leitura.

### Segurança

No momento, `CONFIG!B4` contém `NÃO`; essa é a trava global que proíbe alterações em campanhas.
`CONFIG!B5` contém `24423699562`, permitindo direcionar as leituras detalhadas.
`CONFIG!B6` contém `1`, limite diário de referência em BRL.

O script não contém operações para elevar orçamento, ativar ou criar campanha, cadastrar cobrança ou realizar gastos adicionais. **Manter sempre essas restrições.**

## Atualização para a versão v2

A versão inicial do script foi copiada e executada pelo usuário e está em funcionamento, mas só recupera o resumo da campanha.

Para habilitar as abas de auditoria detalhada, atualizar o código no Google Ads Scripts **substituindo o conteúdo inteiro do arquivo `Code.gs`** pelo conteúdo atual de `scripts/google_ads_sheets_bridge.gs` na branch `main`. Não duplicar `function main()` — o arquivo GitHub inclui uma única main, pronta para colar.

Manter `CONFIG!B4 = NÃO`, executar em modo Visualizar para validar e executar o script uma vez. O Script grava as abas de relatórios. Se a Google Ads API rejeitar alguma consulta GAQL específica, os outros relatórios continuam, e o erro fica registrado em `LOG` como `ERRO_LEITURA`.

Depois de cada leitura, o ChatGPT, pelo conector Google Drive, lê os dados da planilha para analisar conversões, URLs, anúncios e geografia; mudanças posteriores requerem aprovação explícita por comando.

## Prioridades comerciais

1. Auditar e classificar as 3 conversões. Não otimizar lances sem comprovar leads.
2. Confirmar URL de destino da PMax e o vínculo real com as páginas de serviço no domínio `mensagemstudio.shop`.
3. Conferir localizações, presença versus interesse e expansão automática de URLs.
4. Revisar criativos e textos dos grupos de recursos para vídeo com IA, identidade visual, CGI/3D e HTML.
5. Preservar R$ 1/dia. Não criar campanha paralela nem usar oferta promocional de R$ 1.200 que exige gasto prévio.

## Diagnóstico de limites

A ponte opera no próprio Google Ads Scripts + Sheets e não depende de plano Windsor.ai, acesso Google Ads API Basic, n8n pago ou agente local. A primeira autorização foi feita pelo usuário. O conector Google Drive pode editar a planilha, mas **não edita automaticamente o código dentro do editor Google Ads**: uma atualização do código requer substituição manual no Google Ads Scripts.

Script v2 usa `AdsApp.performanceMaxCampaigns().withIds()` para a campanha PMax. Palavras-chave negativas pelo método tradicional `campaign.negativeKeywords()` não são suportadas em Performance Max; esse comando fica bloqueado. Alterações futuras na segmentação exigem método próprio e auditoria.

## Painel de gerenciamento configurado (02/11/2026)

A partir do Google Drive conectado, o ChatGPT criou e verificou as seguintes abas adicionais **sem alterar a campanha no Google Ads**:

- `PAINEL`: fórmulas para nome, ID, status, tipo, orçamento diário, impressões, cliques, custo, conversões, CTR, CPC, última leitura, estado dos relatórios v2 e trava global. Fórmulas adaptadas para a localidade pt_BR usando ponto-e-vírgula.
- `PLANO_PMAX`: prioridades de marketing dos quatro serviços e URLs comerciais. É planejamento, não segmentação aplicada.
- `COPYS_PMAX`: 44 rascunhos de recursos de texto, organizados por HTML, identidade visual, CGI/3D e vídeos IA, com limites de tamanho validados (títulos até 30; títulos longos e descrições até 90 caracteres).
- `SITELINKS_PMAX`: quatro sitelinks para landing pages, branding, 3D e vídeo IA, incluindo textos e descrições compatíveis com limites oficiais. São rascunhos, não anúncios publicados.

O Google Ads da conta `987-700-7101` permanece protegido:
- `CONFIG!B4 = NÃO` (nenhuma execução de comandos).
- `CONFIG!B5 = 24423699562` (somente a campanha autorizada como alvo).
- `CONFIG!B6 = 1` (valor diário de referência, NÃO um teto rígido de faturamento no Google Ads).
- A aba de comandos recebeu validações de estado e aprovação para reduzir alterações acidentais.

**Status da sincronização v2 na última conferência (02/11/2026 após as 17h):** `CONFIG!B7` ainda marcava `2026-11-02 16:30:16` e as abas `GRUPOS_RECURSOS`, `CONVERSOES`, `METAS`, `LOCALIZACOES` estavam vazias. O usuário informou ter salvo e exportado a versão mais nova; porém não há nova leitura confirmada na planilha. Não afirmar auditoria concluída até que novas linhas apareçam. Investigar o registro da execução caso não atualize. Nenhuma campanha foi modificada durante a preparação deste painel.
