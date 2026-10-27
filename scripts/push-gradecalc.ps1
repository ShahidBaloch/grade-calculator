# Publish new commits to gradcalculator-dot/GradeCalc without pushing old history.
# Requires remote: gradecalc → git@github-gradcalculator:gradcalculator-dot/GradeCalc.git
# Baseline tag gradecalc-sync marks what is already reflected on gradecalc/main.

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

git fetch gradecalc 2>$null

if (-not (git rev-parse gradecalc-sync 2>$null)) {
  Write-Error "Missing tag gradecalc-sync. Run once: git tag gradecalc-sync gradecalc/main"
}

$pending = git log --oneline --reverse gradecalc-sync..main
if (-not $pending) {
  Write-Host "Nothing new on main since last gradecalc publish (gradecalc-sync)."
  exit 0
}

Write-Host "Cherry-picking onto gradecalc/main:"
$pending

git checkout -B gradecalc-publish gradecalc/main
try {
  git cherry-pick gradecalc-sync..main
  git push gradecalc gradecalc-publish:main
  git tag -f gradecalc-sync main
  Write-Host "Done. gradecalc-sync -> $(git rev-parse --short main)"
} finally {
  git checkout main 2>$null
  git branch -D gradecalc-publish 2>$null
}
