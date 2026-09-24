if (Test-Path "projects\slackbot\repo") { Remove-Item -Recurse -Force "projects\slackbot\repo" }

if (-not (Test-Path "projects\slackbot")) { New-Item -ItemType Directory -Path "projects\slackbot" -Force }

Set-Location "projects\slackbot"

git clone https://
