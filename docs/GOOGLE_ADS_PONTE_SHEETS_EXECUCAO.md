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


## v3 — consultas editáveis pelo Sheets (protocolo sem procurar código)

O modo de trabalho recomendado deixa as consultas **somente de leitura** em uma nova aba `CONSULTAS`. O script executa `AdsApp.search()` sobre as consultas GAQL aprovadas e grava os resultados nas abas respectivas. Não busca nem executa código JavaScript remoto, não permite escrita em `CONFIG`, `COMANDOS` ou outras abas por consultas, e rejeita consultas fora da campanha autorizada (exceto lista global de ações de conversão).

**A primeira instalação da v3 ainda requer a substituição integral do Code.gs no Google Ads Scripts** usando seleção total e colar; não é necessário procurar linhas/funções. Após essa instalação, futuras correções de colunas e consultas de relatórios são feitas no Sheets por este ChatGPT, sem novas edições do código pelo proprietário. O Google Ads exige essa instalação inicial em seu ambiente autenticado; o conector Google Drive não pode substituir o Code.gs diretamente.

Aba `CONSULTAS`:
- coluna A: nome de um relatório permitido (GRUPOS_RECURSOS, RECURSOS, CONVERSOES, METAS, LOCALIZACOES, CONFIG_PMAX)
- coluna B: `SIM`/`NÃO` — ativa/desativa a consulta
- coluna C: consulta GAQL do tipo `SELECT ... FROM ...` (somente leitura)
- coluna D: atributos do resultado separados por `|`; chaves especiais `$date`, `$campaign`, `$blank`; conversão de moeda com `@BRL`
- coluna E: máximo de registros por relatório, até 200
- coluna F: status OK, SEM_DADOS ou ERRO
- coluna G: quantidade de linhas ou motivo do erro de consulta

Em caso de erro, consultar a coluna G e o `LOG`. **Ajustar apenas a consulta ou coluna na planilha — não pedir ao usuário para procurar funções no código.**

Não confundir esse recurso de configuração de **relatórios** com alteração de anúncios: a publicação de novos recursos, segmentação ou metas ainda exige funções específicas autorizadas. Mantenha `CONFIG!B4=NÃO`, orçamento diário R$1 e nenhuma campanha adicional.


## 02/11/2026 — auditoria efetivamente exportada pela versão 3

Confirmado pelo Google Sheets conectado que o usuário aplicou e executou o script v3 às `2026-11-02 17:59:36`; `CONFIG!B7` foi atualizado para `17:59:44` horário São Paulo.

### Evidência real

- Campanha `24423699562` — Performance Max, nome `Campaign #1`, status `ENABLED`, orçamento médio `R$ 1/dia`.
- Um grupo de recursos: ID `6767362372`, `Grupo de recursos 1`, `ELIGIBLE`, força criativa `POOR`. URLs finais retornaram vazias na consulta de grupo.
- Métricas dos últimos 30 dias: 89 impressões, 4 cliques, gasto R$ 2,213094, 3 conversões reportadas (sem distribuição por ação confirmada).
- Duas ações de conversão ativas e primárias: `Local actions - Directions` (categoria GET_DIRECTIONS, GOOGLE_HOSTED) e `Clicks to call` (CONTACT, GOOGLE_HOSTED).
- Metas habilitadas no relatório: GET_DIRECTIONS, CONTACT; existem também registros PHONE_CALL_LEAD com origem CALL_FROM_ADS/UNKNOWN, cujos valores de biddable retornaram vazios. Não considerar todas as 3 conversões como leads de orçamento.
- Busca inicial de `LOCALIZACOES` usando somente `LOCATION` retornou `SEM_DADOS`. Ampliada para `LOCATION`, `PROXIMITY` e `LOCATION_GROUP` em `CONSULTAS`; requer próxima execução antes de concluir segmentação geográfica.
- `RECURSOS` falhou por campo GAQL não reconhecido `asset_group_asset.performance_label`; removido da consulta na aba CONSULTAS, com coluna de desempenho mantida vazia.
- `CONFIG_PMAX` falhou por campo GAQL não reconhecido `campaign.url_expansion_opt_out`, descontinuado nas versões atuais; removido e marcado na aba de saída como **não verificado**.
- Todas essas correções foram feitas **diretamente no Sheets**, sem alterar script, campanha, anúncios, orçamento, locais ou conversões.

Próxima leitura do script é suficiente para confirmar se as consultas corrigidas `RECURSOS`, `CONFIG_PMAX` e `LOCALIZACOES` retornam conteúdo. A coluna STATUS/DETALHES em `CONSULTAS` mostra OK, SEM_DADOS ou ERRO. A conta de anúncios não é alterada por essas consultas.
