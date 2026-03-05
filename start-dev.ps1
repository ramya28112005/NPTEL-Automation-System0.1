<#
start-dev.ps1
Simple helper to install deps, set optional Gmail env vars, and start the dev server.

Usage:
  .\start-dev.ps1
  .\start-dev.ps1 -GMAIL_USER "you@example.com" -GMAIL_PASS "app_password"
#>

param(
  [string]$GMAIL_USER,
  [string]$GMAIL_PASS
)

Write-Host "Installing dependencies..."
npm install

if ($GMAIL_USER) {
  $env:GMAIL_USER = $GMAIL_USER
  Write-Host "GMAIL_USER set from argument"
}
if ($GMAIL_PASS) {
  $env:GMAIL_PASS = $GMAIL_PASS
  Write-Host "GMAIL_PASS set from argument"
}

Write-Host "Starting dev server (npm run dev)..."
npm run dev
