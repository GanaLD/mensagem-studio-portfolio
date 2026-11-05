#requires -Version 5.1
<#
 Mensagem Studio — Google Ads OAuth bootstrap, entirely on SATA3 E:
 One explicit Google consent is required by Google's OAuth policy.
 Does NOT control the mouse, edit billing, raise budget or touch the .com.br site.
#>
$ErrorActionPreference = 'Stop'
$Root = 'E:\ARQUIVOS DO CHAT GPT E 3D\MARKETING_AI'
if (!(Test-Path 'E:\')) { throw 'O disco SATA3 E: nao esta acessivel. Nenhum arquivo foi modificado.' }
$env:MARKETING_AI_HOME = $Root
$env:GH_CONFIG_DIR = Join-Path $Root 'GH_CONFIG'
$required = @(
  'scripts/google-ads-direct.mjs',
  'scripts/google-ads-oauth-bootstrap.mjs',
  'ops/google-ads/plan.json'
)
foreach ($rel in $required) {
  $dest = Join-Path $Root $rel
  $dir = Split-Path $dest -Parent
  if (!(Test-Path $dir)) { New-Item -Path $dir -ItemType Directory -Force | Out-Null }
  if (Test-Path $dest) {
    $backup = "$dest.bak-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Copy-Item -LiteralPath $dest -Destination $backup -ErrorAction Stop
  }
  $url = 'https://raw.githubusercontent.com/GanaLD/mensagem-studio-portfolio/main/' + $rel
  Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -ErrorAction Stop
  if ((Get-Item -LiteralPath $dest).Length -lt 10) { throw "Arquivo incompleto: $dest" }
}
$node = Get-Command node.exe -ErrorAction SilentlyContinue
if (!$node) {
  throw "Node.js nao esta disponivel. A instalacao nao foi feita no C:. Use Node portatil no SATA3 ou configure o node ja existente no PATH."
}
Write-Host '[MS] Scripts no SATA3 verificados.'
& $node.Source (Join-Path $Root 'scripts/google-ads-oauth-bootstrap.mjs') --apply --sync-gh
if ($LASTEXITCODE -ne 0) {
  throw "A integracao interrompeu com status $LASTEXITCODE. Consulte apenas a mensagem segura acima."
}
Write-Host '[MS] Integracao direta concluida. Consulte a saida APLICADO_E_VERIFICADO do Ads.'
