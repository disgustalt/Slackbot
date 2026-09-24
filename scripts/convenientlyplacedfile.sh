rm -rf projects/slackbot/main

[ ! -d "projects/slackbot" ] && mkdir projects/slackbot

cd projects/slackbot

git clone https://github.com/disgustalt/Slackbot repo

mv repo/package.json .

cat << 'EOF' > .env
SLACK_BOT_TOKEN=your_slack_bot(oauth)_token
SLACK_APP_TOKEN=your_slack_app_token
EOF

npm install