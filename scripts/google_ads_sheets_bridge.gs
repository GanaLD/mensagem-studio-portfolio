/**
 * MENSAGEM STUDIO — Ponte gratuita Google Ads <> Google Sheets
 * Conta: 987-700-7101 | Planilha: privada, no Google Drive do proprietário.
 *
 * PADRÃO: somente leitura. A aba CONFIG possui EXECUTAR_COMANDOS=NÃO.
 * Este código NUNCA aumenta orçamento, cria campanha ou ativa anúncio.
 * Edições suportadas após liberação explícita: RENOMEAR, NEGATIVAR.
 * Fonte: Google Ads Scripts oficial / SpreadsheetApp.
 */
var MS_ADS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1363h3mmB7mCiS6BJoHD6311qDrRoIILhRScDfokSEM8/edit';
var MS_ADS_CUSTOMER = '987-700-7101';

function main() {
  var account = AdsApp.currentAccount();
  if (account.getCustomerId().replace(/\D/g, '') !== MS_ADS_CUSTOMER.replace(/\D/g, '')) {
    throw new Error('Bloqueado: conta Google Ads diferente da Mensagem Studio.');
  }
  if (account.getCurrencyCode() !== 'BRL') {
    throw new Error('Bloqueado: a moeda da conta não é BRL.');
  }

  var ss = SpreadsheetApp.openByUrl(MS_ADS_SHEET_URL);
  var cfg = msReadConfig_(ss);
  if (String(cfg.GOOGLE_ADS_CUSTOMER_ID).replace(/\D/g, '') !== MS_ADS_CUSTOMER.replace(/\D/g, '')) {
    throw new Error('Bloqueado: ID da conta na aba CONFIG diverge.');
  }

  // Sempre atualizar o diagnóstico, mesmo quando as alterações estiverem bloqueadas.
  msExportCampaigns_(ss, account);
  ss.getSheetByName('CONFIG').getRange('B7').setValue(
    Utilities.formatDate(new Date(), account.getTimeZone(), 'yyyy-MM-dd HH:mm:ss')
  );
  Logger.log('Relatório salvo. Conta ' + account.getCustomerId() + ' | moeda ' + account.getCurrencyCode());

  if (String(cfg.EXECUTAR_COMANDOS).trim().toUpperCase() !== 'SIM') {
    Logger.log('Modo SOMENTE LEITURA: nenhum comando será aplicado.');
    return;
  }
  if (AdsApp.getExecutionInfo().isPreview()) {
    Logger.log('Pré-visualização: alterações na conta bloqueadas.');
    return;
  }
  if (!/^\d+$/.test(String(cfg.CAMPANHA_PERMITIDA_ID || '').trim())) {
    Logger.log('Nenhuma campanha foi autorizada em CONFIG!B5.');
    return;
  }

  msExecuteApprovedCommands_(ss, cfg, account);
}

function msReadConfig_(ss) {
  var rows = ss.getSheetByName('CONFIG').getRange('A2:B8').getDisplayValues();
  var cfg = {};
  rows.forEach(function(row) { cfg[String(row[0]).trim()] = row[1]; });
  return cfg;
}

function msExportCampaigns_(ss, account) {
  var performance = {};
  try {
    var stats = AdsApp.search(
      'SELECT campaign.id, metrics.impressions, metrics.clicks, ' +
      'metrics.cost_micros, metrics.conversions FROM campaign ' +
      'WHERE segments.date DURING LAST_30_DAYS'
    );
    while (stats.hasNext()) {
      var row = stats.next();
      performance[String(row.campaign.id)] = [
        Number(row.metrics.impressions || 0),
        Number(row.metrics.clicks || 0),
        Number(row.metrics.costMicros || 0) / 1000000,
        Number(row.metrics.conversions || 0)
      ];
    }
  } catch (e) {
    Logger.log('Métricas indisponíveis, mantendo auditoria estrutural: ' + e.message);
  }

  var campaigns = AdsApp.search(
    'SELECT campaign.id, campaign.name, campaign.status, ' +
    'campaign.advertising_channel_type, campaign.bidding_strategy_type, ' +
    'campaign_budget.amount_micros FROM campaign'
  );
  var output = [], count = 0;
  var now = Utilities.formatDate(new Date(), account.getTimeZone(), 'yyyy-MM-dd HH:mm:ss');

  while (campaigns.hasNext()) {
    var row = campaigns.next();
    var id = String(row.campaign.id);
    var m = performance[id] || [0, 0, 0, 0];
    var budgetMicros = row.campaignBudget ? Number(row.campaignBudget.amountMicros || 0) : 0;
    output.push([
      now, account.getCustomerId(), id, String(row.campaign.name),
      String(row.campaign.status), String(row.campaign.advertisingChannelType),
      budgetMicros / 1000000, m[0], m[1], m[2], m[3],
      String(row.campaign.biddingStrategyType || '')
    ]);
    count++;
    if (count >= 500) break;
  }

  var sheet = ss.getSheetByName('CAMPANHAS');
  var last = sheet.getLastRow();
  if (last > 1) sheet.getRange(2, 1, last - 1, 12).clearContent();
  if (output.length > 0) sheet.getRange(2, 1, output.length, 12).setValues(output);
  Logger.log('Campanhas encontradas: ' + output.length);
}

function msExecuteApprovedCommands_(ss, cfg, account) {
  var sheet = ss.getSheetByName('COMANDOS');
  var last = sheet.getLastRow();
  if (last <= 1) return;
  var commands = sheet.getRange(2, 1, Math.min(last - 1, 100), 8).getDisplayValues();
  var allowedId = String(cfg.CAMPANHA_PERMITIDA_ID).trim();
  var maxBudget = Number(String(cfg.LIMITE_DIARIO_REFERENCIA_BRL).replace(',', '.'));

  for (var i = 0; i < commands.length; i++) {
    var c = commands[i], rowNo = i + 2;
    var commandId = String(c[0]).trim();
    var action = String(c[1]).trim().toUpperCase();
    var campaignId = String(c[2]).trim();
    var value = String(c[3]).trim();
    var approved = String(c[4]).trim().toUpperCase();
    var status = String(c[5]).trim().toUpperCase();

    if (!commandId || approved !== 'SIM' || status !== 'PENDENTE') continue;
    var outcome = 'BLOQUEADO', detail = 'Comando não autorizado.';
    try {
      if (campaignId !== allowedId || !/^\d+$/.test(campaignId)) {
        throw new Error('ID diferente da única campanha autorizada.');
      }
      if (action !== 'RENOMEAR' && action !== 'NEGATIVAR') {
        throw new Error('Ação não permitida. Não há comandos de orçamento ou ativação.');
      }
      var it = AdsApp.campaigns().withIds([campaignId]).get();
      if (!it.hasNext()) throw new Error('Campanha não suportada por AdsApp.campaigns(), ou não encontrada.');
      var campaign = it.next();
      var budget = campaign.getBudget();
      var amount = budget ? Number(budget.getAmount()) : NaN;
      if (!(amount > 0 && amount <= 1.0 && amount <= maxBudget)) {
        throw new Error('Orçamento acima de R$ 1/dia ou inválido; nenhuma alteração aplicada.');
      }
      if (action === 'RENOMEAR') {
        if (!value || value.length > 80 || /[\r\n]/.test(value)) throw new Error('Nome inválido.');
        if (campaign.getName() !== value) campaign.setName(value);
      } else if (action === 'NEGATIVAR') {
        if (value.length < 2 || value.length > 80) throw new Error('Palavra negativa inválida.');
        var negs = campaign.negativeKeywords().get(), present = false;
        while (negs.hasNext()) {
          if (negs.next().getText() === value) { present = true; break; }
        }
        if (!present) campaign.createNegativeKeyword(value);
      }
      outcome = 'EXECUTADO';
      detail = 'Alteração aplicada sem modificar o orçamento ou ativar anúncios.';
    } catch (error) {
      detail = String(error.message || error);
    }
    var timestamp = Utilities.formatDate(new Date(), account.getTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    sheet.getRange(rowNo, 6, 1, 3).setValues([[outcome, timestamp, detail]]);
    ss.getSheetByName('LOG').appendRow([
      timestamp, account.getCustomerId(), campaignId, commandId, action, outcome, detail
    ]);
  }
}
