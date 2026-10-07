# Notify Bing & Yandex about sitemap and priority URLs (IndexNow + Bing ping).
# Requires https://www.gradcalc.com/{INDEXNOW_KEY}.txt to return the key (deploy public/ first).

$ErrorActionPreference = "Stop"
$HostName = "www.gradcalc.com"
$SiteOrigin = "https://$HostName"
$IndexNowKey = "de52b36cf7918a40"
$KeyLocation = "$SiteOrigin/$IndexNowKey.txt"
$Sitemap = "$SiteOrigin/sitemap.xml"

$PriorityUrls = @(
  "$SiteOrigin/about",
  "$SiteOrigin/disclaimer",
  "$SiteOrigin/ca/cumulative-gpa-calculator",
  "$SiteOrigin/nz/gpa-calculator",
  "$SiteOrigin/pk/cgpa-calculator",
  "$SiteOrigin/pk/percentage-to-cgpa",
  "$SiteOrigin/guides/final-exam-tips",
  "$SiteOrigin/guides/gpa-glossary",
  "$SiteOrigin/guides",
  "$SiteOrigin/calculators"
)

Write-Host "=== Bing sitemap ping ==="
$bingPing = "https://www.bing.com/ping?sitemap=$([uri]::EscapeDataString($Sitemap))"
try {
  $r = Invoke-WebRequest -Uri $bingPing -Method GET -UseBasicParsing -TimeoutSec 60
  Write-Host "Bing ping status: $($r.StatusCode)"
} catch {
  Write-Warning "Bing ping: $($_.Exception.Message)"
}

Write-Host "`n=== Verify IndexNow key on site ==="
try {
  $keyBody = (Invoke-WebRequest -Uri $KeyLocation -UseBasicParsing -TimeoutSec 30).Content.Trim()
  if ($keyBody -ne $IndexNowKey) {
    Write-Warning "Key file mismatch at $KeyLocation - deploy public/$IndexNowKey.txt first."
  } else {
    Write-Host "Key file OK"
  }
} catch {
  Write-Warning "Key file not reachable: $KeyLocation - deploy then re-run this script."
}

$payload = @{
  host        = $HostName
  key         = $IndexNowKey
  keyLocation = $KeyLocation
  urlList     = $PriorityUrls
} | ConvertTo-Json -Compress

$indexNowEndpoints = @(
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow"
)

foreach ($endpoint in $indexNowEndpoints) {
  Write-Host "`n=== IndexNow POST $endpoint ==="
  try {
    $r = Invoke-WebRequest -Uri $endpoint -Method POST -Body $payload -ContentType "application/json; charset=utf-8" -UseBasicParsing -TimeoutSec 60
    Write-Host "Status: $($r.StatusCode) $($r.StatusDescription)"
  } catch {
    $status = $_.Exception.Response.StatusCode.value__
    Write-Warning "IndexNow $endpoint failed (HTTP $status): $($_.Exception.Message)"
  }
}

Write-Host "`nDone."
