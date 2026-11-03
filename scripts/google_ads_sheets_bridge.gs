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
  msRunConfiguredReports_(ss, account, cfg);
  msPublishApprovedAssets_(ss, account, cfg);
  msReplacePMaxAssets_(ss, account, cfg);
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
      var it = AdsApp.performanceMaxCampaigns().withIds([campaignId]).get();
      if (!it.hasNext()) throw new Error('Campanha Performance Max não encontrada na conta autorizada.');
      var campaign = it.next();
      if (action === 'NEGATIVAR') {
        throw new Error('Performance Max não aceita palavras-chave negativas por este método. Não alterar segmentação sem auditoria.');
      }
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



/**
 * Auditoria v2 — exclusivamente leitura. Resultados limitados a 200 por aba.
 * Se um recurso não estiver disponível na versão ativa da API, registra erro
 * no LOG, sem interromper as leituras das outras abas.
 */
function msExportPMaxAudit_(ss, account, cfg) {
  var campaignId = String(cfg.CAMPANHA_PERMITIDA_ID || '').trim();
  if (!/^\d+$/.test(campaignId)) {
    Logger.log('Auditoria PMax ignorada: definir CONFIG!B5 com o ID da campanha.');
    return;
  }
  var now = Utilities.formatDate(new Date(), account.getTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  var accountId = account.getCustomerId();
  var id = campaignId;

  // 1. Grupos de recursos, URLs de destino, qualidade e métricas.
  msAuditQuery_(ss, 'GRUPOS_RECURSOS',
    'SELECT asset_group.id, asset_group.name, asset_group.status, ' +
    'asset_group.primary_status, asset_group.ad_strength, asset_group.final_urls, ' +
    'metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions ' +
    'FROM asset_group WHERE campaign.id = ' + id +
    ' AND segments.date DURING LAST_30_DAYS',
    12, function(r) {
      var a = r.assetGroup || {}, m = r.metrics || {};
      return [now, id, a.id, a.name, a.status, a.primaryStatus,
        a.adStrength, JSON.stringify(a.finalUrls || []), m.impressions || 0,
        m.clicks || 0, Number(m.costMicros || 0) / 1000000, m.conversions || 0];
    }, accountId, id);

  // 2. Recursos criativos — textos, imagens e vídeos vinculados.
  msAuditQuery_(ss, 'RECURSOS',
    'SELECT asset_group.id, asset_group_asset.asset, asset_group_asset.field_type, ' +
    'asset_group_asset.status, asset_group_asset.performance_label, ' +
    'asset.type, asset.text_asset.text ' +
    'FROM asset_group_asset WHERE campaign.id = ' + id,
    9, function(r) {
      var g = r.assetGroup || {}, a = r.assetGroupAsset || {}, asset = r.asset || {};
      var textValue = asset.textAsset ? asset.textAsset.text : '';
      return [now, g.id, a.fieldType, asset.type, a.status,
        a.performanceLabel, a.asset, textValue || '', ''];
    }, accountId, id);

  // 3. Conversões por origem da campanha + metadados de cada ação.
  var actionCounts = {};
  try {
    var ci = AdsApp.search(
      'SELECT segments.conversion_action_name, metrics.conversions ' +
      'FROM campaign WHERE campaign.id = ' + id +
      ' AND segments.date DURING LAST_30_DAYS');
    while (ci.hasNext()) {
      var cr = ci.next(), n = String(cr.segments.conversionActionName || '');
      actionCounts[n] = (actionCounts[n] || 0) + Number(cr.metrics.conversions || 0);
    }
  } catch (error) {
    msAuditError_(ss, now, accountId, id, 'CONVERSOES-DETALHE', error);
  }
  msAuditQuery_(ss, 'CONVERSOES',
    'SELECT conversion_action.id, conversion_action.name, conversion_action.category, ' +
    'conversion_action.type, conversion_action.status, conversion_action.primary_for_goal, ' +
    'conversion_action.counting_type FROM conversion_action ' +
    'WHERE conversion_action.status = ENABLED',
    10, function(r) {
      var a = r.conversionAction || {};
      return [now, a.id, a.name, a.category, a.type, a.status,
        a.primaryForGoal, a.countingType, a.type,
        'Conversões da campanha nos últimos 30 dias: ' + (actionCounts[String(a.name)] || 0)];
    }, accountId, id);

  // 4. Metas consideradas para os lances da campanha.
  msAuditQuery_(ss, 'METAS',
    'SELECT campaign_conversion_goal.campaign, campaign_conversion_goal.category, ' +
    'campaign_conversion_goal.origin, campaign_conversion_goal.biddable ' +
    'FROM campaign_conversion_goal WHERE campaign_conversion_goal.campaign = ' +
    "'customers/" + accountId.replace(/\D/g, '') + "/campaigns/" + id + "'",
    6, function(r) {
      var g = r.campaignConversionGoal || {};
      return [now, id, g.category, g.origin, String(g.biddable), 'Verificar se a meta representa um lead real'];
    }, accountId, id);

  // 5. Inclusões e exclusões de localidades, sem modificar a entrega.
  msAuditQuery_(ss, 'LOCALIZACOES',
    'SELECT campaign_criterion.criterion_id, campaign_criterion.type, ' +
    'campaign_criterion.location.geo_target_constant, campaign_criterion.negative, ' +
    'campaign_criterion.status FROM campaign_criterion ' +
    'WHERE campaign.id = ' + id + ' AND campaign_criterion.type = LOCATION',
    8, function(r) {
      var c = r.campaignCriterion || {}, loc = c.location || {};
      return [now, id, c.criterionId, c.type, loc.geoTargetConstant,
        String(c.negative), c.status, 'Revisar localização antes de alterar segmentação'];
    }, accountId, id);

  // 6. Critérios globais de presença e expansão de URLs.
  msAuditQuery_(ss, 'CONFIG_PMAX',
    'SELECT campaign.id, campaign.name, campaign.status, ' +
    'campaign.geo_target_type_setting.positive_geo_target_type, ' +
    'campaign.geo_target_type_setting.negative_geo_target_type, ' +
    'campaign.url_expansion_opt_out FROM campaign WHERE campaign.id = ' + id,
    7, function(r) {
      var c = r.campaign || {}, g = c.geoTargetTypeSetting || {};
      return [now, c.id, c.name, c.status,
        g.positiveGeoTargetType, g.negativeGeoTargetType,
        String(c.urlExpansionOptOut)];
    }, accountId, id);
}

function msAuditQuery_(ss, sheetName, sql, width, mapRow, accountId, campaignId) {
  var now = Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  try {
    var it = AdsApp.search(sql), rows = [];
    while (it.hasNext() && rows.length < 200) {
      var data = mapRow(it.next());
      if (!Array.isArray(data) || data.length !== width) throw new Error('Quantidade de colunas inválida para ' + sheetName);
      rows.push(data.map(msSafeSheetValue_));
    }
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) throw new Error('Aba inexistente: ' + sheetName);
    var oldCount = sheet.getLastRow() - 1;
    if (oldCount > 0) sheet.getRange(2, 1, oldCount, width).clearContent();
    if (rows.length > 0) sheet.getRange(2, 1, rows.length, width).setValues(rows);
    Logger.log(sheetName + ': ' + rows.length + ' registros.');
  } catch (error) {
    msAuditError_(ss, now, accountId, campaignId, sheetName, error);
  }
}

function msSafeSheetValue_(val) {
  if (val === null || typeof val === 'undefined') return '';
  if (typeof val === 'number' && isFinite(val)) return val;
  if (typeof val === 'boolean') return String(val);
  if (Array.isArray(val) || typeof val === 'object') return JSON.stringify(val).slice(0,3500);
  return String(val).slice(0,3500);
}

function msAuditError_(ss, timestamp, accountId, campaignId, area, error) {
  var detail = String(error && error.message ? error.message : error);
  Logger.log(area + ' — ' + detail);
  var log = ss.getSheetByName('LOG');
  if (log) log.appendRow([timestamp, accountId, campaignId, 'AUDITORIA',
    area, 'ERRO_LEITURA', detail.slice(0,3500)]);
}


/** Consultas de relatórios gerenciadas na planilha, SEM executar código remoto. */
function msRunConfiguredReports_(ss, account, cfg) {
  var control=ss.getSheetByName('CONSULTAS');
  if(!control) { Logger.log('Aba CONSULTAS não localizada.'); return; }
  var allow={GRUPOS_RECURSOS:true,RECURSOS:true,CONVERSOES:true,METAS:true,LOCALIZACOES:true,CONFIG_PMAX:true};
  var count=Math.min(control.getLastRow()-1,30);
  if(count<1)return;
  var definitions=control.getRange(2,1,count,7).getDisplayValues();
  var campaignId=String(cfg.CAMPANHA_PERMITIDA_ID||'').trim();
  if(!/^\d+$/.test(campaignId))return;
  var now=Utilities.formatDate(new Date(),account.getTimeZone(),'yyyy-MM-dd HH:mm:ss');
  definitions.forEach(function(d,index){
    var name=String(d[0]).trim();
    if(!allow[name]||String(d[1]).trim().toUpperCase()!=='SIM')return;
    var sql=String(d[2]).trim(), keys=String(d[3]).split('|');
    var maximum=Math.max(1,Math.min(parseInt(d[4],10)||100,200));
    var state='ERRO',message='';
    try {
      if(!/^SELECT\s+[\s\S]+\s+FROM\s+[\s\S]+$/i.test(sql)||sql.indexOf(';')>=0)throw Error('Apenas SELECT válido');
      if(name!=='CONVERSOES'&&sql.indexOf(campaignId)<0)throw Error('Campanha não autorizada');
      var target=ss.getSheetByName(name);
      if(!target)throw Error('Aba não encontrada: '+name);
      var width=target.getRange(1,1,1,target.getLastColumn()).getDisplayValues()[0].filter(String).length;
      if(keys.length!==width)throw Error('Colunas não correspondem: '+name);
      var iter=AdsApp.search(sql),items=[];
      while(iter.hasNext()&&items.length<maximum) {
        var entity=iter.next();
        items.push(keys.map(function(k){
          k=String(k).trim();
          if(k==='$date')return now;
          if(k==='$campaign')return campaignId;
          if(k==='$blank')return '';
          var money=/@BRL$/.test(k);
          var value=msPath_(entity,k.replace(/@BRL$/,''));
          if(money)return Number(value||0)/1000000;
          return msSheetSafe_(value);
        }));
      }
      var used=target.getLastRow()-1;
      if(used>0)target.getRange(2,1,used,width).clearContent();
      if(items.length)target.getRange(2,1,items.length,width).setValues(items);
      state=items.length?'OK':'SEM_DADOS';
      message=items.length+' linha(s), '+now;
      Logger.log(name+': '+message);
    }catch(err) {
      message=String(err.message||err).slice(0,1500);
      Logger.log(name+' ERRO '+message);
      var log=ss.getSheetByName('LOG');
      if(log)log.appendRow([now,account.getCustomerId(),campaignId,'CONSULTAS',name,'ERRO_LEITURA',message]);
    }
    control.getRange(index+2,6,1,2).setValues([[state,message]]);
  });
}
function msPath_(root,path){
  var steps=path.split('.'),value=root;
  for(var i=0;i<steps.length;i++){if(value===null||typeof value==='undefined')return '';value=value[steps[i]];}
  return value;
}
function msSheetSafe_(v) {
  if(v===null||typeof v==='undefined')return '';
  if(typeof v==='number')return isFinite(v)?v:0;
  if(typeof v==='boolean')return String(v);
  if(typeof v==='object')v=JSON.stringify(v);
  var text=String(v).slice(0,2000);
  if(/^[=+\-@]/.test(text))text="'"+text;
  return text;
}



/**
 * 2026-11-02 — publicação de criativos APROVADOS no grupo Performance Max.
 * Integração privada: lê os arquivos do Drive do usuário; nunca usa imagem externa.
 * Não edita orçamento, lances, localização, status da campanha, grupos ou conversões.
 * Não cria nem remove campanhas ou grupos; apenas adiciona recursos ao grupo existente.
 */
function msPublishApprovedAssets_(ss, account, cfg) {
  if (AdsApp.getExecutionInfo().isPreview()) {
    Logger.log('Pré-visualização: PUBLICAR_ASSETS não terá alterações no Google Ads.');
    return;
  }
  var sheet=ss.getSheetByName('PUBLICAR_ASSETS');
  if (!sheet || sheet.getLastRow()<2) return;

  var campaignId='24423699562';
  var groupId='6767362372';
  if (String(cfg.CAMPANHA_PERMITIDA_ID||'').trim() !== campaignId) {
    Logger.log('Publicação bloqueada: campanha autorizada não corresponde.');
    return;
  }
  if (String(account.getCustomerId()).replace(/\D/g,'') !== '9877007101' ||
      String(account.getCurrencyCode()) !== 'BRL') {
    throw new Error('Publicação bloqueada: conta ou moeda diferente.');
  }
  var iterator=AdsApp.performanceMaxCampaigns().withIds([campaignId]).get();
  if (!iterator.hasNext()) throw new Error('Campanha Performance Max não encontrada.');
  var campaign=iterator.next();
  var amount=Number(campaign.getBudget().getAmount());
  if (!(amount>0) || amount>1) {
    throw new Error('Publicação bloqueada: orçamento diário excede R$ 1 ou é inválido.');
  }

  var groups=campaign.assetGroups().get(), group=null;
  while (groups.hasNext()) {
    var candidate=groups.next();
    if (String(candidate.getId())===groupId) { group=candidate; break; }
  }
  if (!group) throw new Error('Grupo de recursos 6767362372 não encontrado.');
  var counts={HEADLINE:0,LONG_HEADLINE:0,DESCRIPTION:0,SQUARE_MARKETING_IMAGE:0};
  var max={HEADLINE:15,LONG_HEADLINE:5,DESCRIPTION:5,SQUARE_MARKETING_IMAGE:20};
  var existingText={};
  var existingNames={};
  var q=AdsApp.search(
    'SELECT asset_group_asset.field_type, asset.text_asset.text, asset.name '+
    'FROM asset_group_asset WHERE asset_group.id = '+groupId+
    ' AND asset_group_asset.status != REMOVED'
  );
  while (q.hasNext()) {
    var t=q.next();
    var f=String(t.assetGroupAsset.fieldType||'');
    if (!(f in counts)) continue;
    counts[f]++;
    var value=t.asset&&t.asset.textAsset?t.asset.textAsset.text:'';
    if (value) existingText[f+'|'+String(value)]=true;
    var name=t.asset?t.asset.name:'';
    if (name) existingNames[String(name)]=true;
  }

  var total=Math.min(sheet.getLastRow()-1,60);
  var inputs=sheet.getRange(2,1,total,11).getDisplayValues();
  var now=Utilities.formatDate(new Date(),account.getTimeZone(),'yyyy-MM-dd HH:mm:ss');

  for (var i=0;i<inputs.length;i++) {
    var row=inputs[i], sheetRow=i+2;
    var recordId=String(row[0]||'').trim();
    var fieldType=String(row[1]||'').trim();
    var data=String(row[3]||'').trim();
    var targetCampaign=String(row[4]||'').trim();
    var targetGroup=String(row[5]||'').trim();
    var approved=String(row[6]||'').trim().toUpperCase();
    var status=String(row[7]||'').trim().toUpperCase();
    if (!recordId || approved !== 'SIM' || status !== 'PENDENTE') continue;

    var result='ERRO', note='', assetName='';
    try {
      if (targetCampaign!==campaignId || targetGroup!==groupId) {
        throw new Error('Campanha ou grupo de recursos diferente do autorizado.');
      }
      if (!(fieldType in counts)) throw new Error('Tipo de criativo não autorizado.');
      if (!data) throw new Error('Conteúdo ou ID do Drive vazio.');
      if (counts[fieldType]>=max[fieldType]) {
        result='REVISAR';
        note='Limite de '+fieldType+' atingido, sem substituir criativos existentes.';
        sheet.getRange(sheetRow,8,1,4).setValues([[result,now,note,'']]);
        continue;
      }

      // Marcar PROCESSANDO primeiro: uma interrupção não faz publicação duplicada.
      sheet.getRange(sheetRow,8,1,2).setValues([['PROCESSANDO',now]]);
      SpreadsheetApp.flush();

      if (fieldType==='SQUARE_MARKETING_IMAGE') {
        assetName='MS_ADS_'+recordId;
        if (existingNames[assetName]) {
          result='IGNORADO';
          note='Imagem com mesmo nome já presente no grupo.';
        } else {
          var file=DriveApp.getFileById(data);
          if (file.getMimeType()!=='image/png' && file.getMimeType()!=='image/jpeg') {
            throw new Error('Imagem deve ser PNG ou JPG.');
          }
          if (file.getSize()>5120000) throw new Error('Arquivo ultrapassa 5 MB.');
          var imageBlob=file.getBlob();
          var assetOperation=AdsApp.adAssets().newImageAssetBuilder()
            .withName(assetName)
            .withData(imageBlob)
            .withSyntheticContentAttestation('IS_SYNTHETIC')
            .build();
          var imageAsset=assetOperation.getResult();
          if (!imageAsset) throw new Error('Imagem não foi importada para a biblioteca Ads.');
          var imageLink=group.addAsset(imageAsset,'SQUARE_MARKETING_IMAGE');
          if (!imageLink.isSuccessful()) throw new Error('Falha ao vincular imagem: '+imageLink.getErrors().join('; '));
          counts[fieldType]++;
          existingNames[assetName]=true;
          result='PUBLICADO';
          note='Imagem enviada à biblioteca e adicionada ao grupo existente.';
        }
      } else {
        var limits={HEADLINE:30,LONG_HEADLINE:90,DESCRIPTION:90};
        if (data.length>limits[fieldType]) throw new Error('Texto ultrapassa limite de caracteres.');
        if (existingText[fieldType+'|'+data]) {
          result='IGNORADO';
          note='Texto idêntico já presente no grupo.';
        } else {
          var textLink=group.addAsset(data,fieldType);
          if (!textLink.isSuccessful()) throw new Error('Falha ao vincular texto: '+textLink.getErrors().join('; '));
          counts[fieldType]++;
          existingText[fieldType+'|'+data]=true;
          result='PUBLICADO';
          note='Texto adicionado ao grupo de recursos da campanha.';
        }
      }
    } catch (e) {
      result='ERRO';
      note=String(e.message||e).slice(0,750);
      Logger.log(recordId+' erro: '+note);
    }
    sheet.getRange(sheetRow,8,1,4).setValues([[result,now,note,assetName]]);
    if (result==='PUBLICADO') Logger.log(recordId+': '+note);
    var log=ss.getSheetByName('LOG');
    if(log)log.appendRow([now,account.getCustomerId(),campaignId,recordId,fieldType,result,note]);
  }
}



/**
 * Substituição direta de textos dentro do AssetGroup PMax existente.
 * Somente linhas aprovadas e pendentes da aba SUBSTITUICOES_PMAX.
 * Preserva orçamento, veiculação, grupo, metas, localização e URL.
 */
function msReplacePMaxAssets_(ss, account, cfg) {
  if (AdsApp.getExecutionInfo().isPreview()) {
    Logger.log('Pré-visualização: substituições não serão aplicadas.');
    return;
  }
  var campaignId='24423699562', groupId='6767362372';
  if(String(cfg.CAMPANHA_PERMITIDA_ID||'').trim()!==campaignId) {
    Logger.log('SUBSTITUICOES_PMAX bloqueada: campanha diferente.');
    return;
  }
  if (account.getCustomerId().replace(/\D/g,'')!=='9877007101' ||
      account.getCurrencyCode()!=='BRL') throw Error('Conta ou moeda inesperada.');
  var campaigns=AdsApp.performanceMaxCampaigns().withIds([campaignId]).get();
  if (!campaigns.hasNext())throw Error('Performance Max não encontrada.');
  var campaign=campaigns.next();
  var daily=Number(campaign.getBudget().getAmount());
  if (!(daily>0) || daily>1)throw Error('Orçamento diário maior que R$ 1: não alterar.');

  var groups=campaign.assetGroups().withIds([groupId]).get();
  if (!groups.hasNext())throw Error('Grupo de recursos não localizado.');
  var group=groups.next();
  var sheet=ss.getSheetByName('SUBSTITUICOES_PMAX');
  if(!sheet||sheet.getLastRow()<2)return;
  var items=sheet.getRange(2,1,Math.min(sheet.getLastRow()-1,40),11).getDisplayValues();
  var now=Utilities.formatDate(new Date(),account.getTimeZone(),'yyyy-MM-dd HH:mm:ss');
  // Confere vínculos reais no Ads antes de qualquer remoção.
  var current={};
  var query=AdsApp.search(
    'SELECT asset_group_asset.asset, asset_group_asset.field_type, ' +
    'asset.text_asset.text FROM asset_group_asset ' +
    'WHERE asset_group.id = '+groupId+
    ' AND asset_group_asset.status = ENABLED'
  );
  while(query.hasNext()) {
    var record=query.next();
    var field=String(record.assetGroupAsset.fieldType||'');
    var name=String(record.assetGroupAsset.asset||'');
    current[field+'|'+name]=String(record.asset?.textAsset?.text||'');
    current[field+'|TEXT|'+String(record.asset?.textAsset?.text||'')]=true;
  }

  for(var i=0;i<items.length;i++){
    var row=items[i], sheetRow=i+2;
    var itemId=String(row[0]||'').trim();
    var rowGroup=String(row[1]||'').trim();
    var fieldType=String(row[2]||'').trim();
    var oldResource=String(row[3]||'').trim();
    var expectedOld=String(row[4]||'');
    var newText=String(row[5]||'');
    var approved=String(row[6]||'').trim().toUpperCase();
    var state=String(row[7]||'').trim().toUpperCase();
    if(!itemId || approved !== 'SIM' || state !== 'PENDENTE')continue;

    var outcome='ERRO',detail='',newResource='';
    try{
      if(rowGroup!==groupId)throw Error('Grupo de recursos diferente do autorizado.');
      var limit={HEADLINE:30,LONG_HEADLINE:90,DESCRIPTION:90}[fieldType];
      if(!limit || !newText || newText.length>limit)throw Error('Texto inválido ou muito longo.');
      if(!/^customers\/9877007101\/assets\/\d+$/.test(oldResource))throw Error('Recurso antigo inesperado.');
      if(current[fieldType+'|'+oldResource]!==expectedOld) {
        if(current[fieldType+'|TEXT|'+newText]) {
          outcome='IGNORADO';detail='Texto novo já está vinculado; revisão manual do texto antigo ainda necessária.';
          sheet.getRange(sheetRow,8,1,4).setValues([[outcome,now,detail,'']]);
          continue;
        }
        throw Error('O texto antigo não corresponde ao vínculo atual no Google Ads.');
      }
      if(current[fieldType+'|TEXT|'+newText])throw Error('Texto novo já está presente no grupo; não remover o antigo sem análise.');
      var it=AdsApp.adAssets().assets().withResourceNames([oldResource]).get();
      if(!it.hasNext())throw Error('Recurso antigo não encontrado na biblioteca do Ads.');
      var oldAsset=it.next();

      // Trava de repetição: se interromper, a linha PROCESSANDO exige revisão antes de nova tentativa.
      sheet.getRange(sheetRow,8,1,2).setValues([['PROCESSANDO',now]]);
      SpreadsheetApp.flush();
      var removed=false;
      try{
        group.removeAsset(oldAsset,fieldType);
        removed=true;
        var op=group.addAsset(newText,fieldType);
        if(!op.isSuccessful())throw Error('Novo recurso rejeitado: '+op.getErrors().join('; '));
        var created=op.getResult();
        newResource=created?.getResourceName?.()||'CRIADO';
        outcome='PUBLICADO';detail='Recurso antigo removido e novo texto vinculado.';
        delete current[fieldType+'|'+oldResource];
        current[fieldType+'|TEXT|'+newText]=true;
      }catch(error){
        if(removed){
          try{
            var rollback=group.addAsset(oldAsset,fieldType);
            if(!rollback.isSuccessful()) {
              throw Error('Falha ao restaurar recurso: '+rollback.getErrors().join('; '));
            }
            detail='Falha na substituição; original restaurado. '+String(error.message||error);
          }catch(restoreError){
            detail='ATENÇÃO: falha na substituição E no rollback: '+
              String(restoreError.message||restoreError)+'; causa original: '+String(error.message||error);
          }
        }else detail=String(error.message||error);
        outcome='ERRO';
      }
    }catch(e) {
      detail=String(e.message||e);
      outcome='ERRO';
    }
    detail=detail.slice(0,1600);
    sheet.getRange(sheetRow,8,1,4).setValues([[outcome,now,detail,newResource]]);
    var log=ss.getSheetByName('LOG');
    if(log)log.appendRow([now,account.getCustomerId(),campaignId,itemId,fieldType,outcome,detail]);
    Logger.log(itemId+' '+outcome+': '+detail);
  }
}
