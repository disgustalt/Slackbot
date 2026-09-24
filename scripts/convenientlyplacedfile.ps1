if ( Test-Path "repo" ) { Remove-Item -Recurse -Force "repo" }

if ( Test-Path "projects\slackbot\repo" ) { Remove-Item -Recurse -Force "projects\slackbot\repo" }

if ( (Get-Location).Path -notlike "*projects\slackbot" and -not ( Test-Path "projects\slackbot" ) ) { New-Item -ItemType Directory -Path "projects\slackbot" -Force }

if ( (Get-Location).Path -notlike "*projects\slackbot" ) { Set-Location "projects\slackbot" }

git clone https://github.com/disgustalt/Slackbot repo

if ( Test-Path "repo\package.json" ) { Move-Item "repo\package.json" . -Force }

@'
SLACK_BOT_TOKEN=your_bot(oauth)_token
SLACK_APP_TOKEN=your_app_token
'@ | Out-File -FilePath .env -Encoding utf8 -Force

@'
export default {
  bot_name: "your_bot_name",
  prefix: true
}
'@ | Out-File repo\config.js -Encoding  utf8 -Force

npm install