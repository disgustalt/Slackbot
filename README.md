# Dynamite
A simple Slack bot made in JavaScript :)

---

## Contents
- [My yap](#yap)
- [Features](#features)
- [Running it yourself](#running-the-bot-yourself)
- [Customizing](#customizing)
- [Keeping up-to-date](#keeping-up-to-date)

> [!NOTE]
> If you want to customize the bot, please go through [Running it yourself](#running-the-bot-yourself) and [Customizing](#customizing). [Keeping up to date](#keeping-upto-date) will force you to run exactly what's on this repository (you can only change the bot name and tokens). (That isss, unless you edit the script :p)
---

## Yap
Dynamite is a simple Slack bot made using the `@slack/bolt` npm package.

The bot uses a 'custom' (not exactly) command registration system.

All commands are imported from [/commands](/commands) (obviously)
And modal listeners are in [/modals](/modals)

what else do I write heree


## Features
The bot has **3 commands** and **1 modal listener**.

### Commands:
- `/dynamite-caption` - Caption any image with some text.
- `/dynamite-fact` - Get a random fact and surprise yourself ;)
- `/dynamite-ping` - Pong! :)


## Running the bot yourself
If you wanna run the bot on your own device/server, you can follow the instructions below.
Choose an option based on what Operating system you're on:
- [Windows](#windows)
- [Linux](#linux)

<sub>Note: For Android users, you can install Termux <a href="https://f-droid.org/en/packages/com.termux/">here</a> and follow the Linux guide!</sub>

### Windows
Run these commands in Windows PowerShell :))

First, we can install the system packages:
```powershell
winget install --id Git.Git -e --accept-source-agreements --accept-package-agreements; `
winget install --id GNU.Nano -e; `
winget install --id cURL.cURL -e; `
irm https://fnm.vercel.app/install | iex; `
fnm env --use-on-cd | Out-String | Invoke-Expression; `
if (!(Test-Path $PROFILE)) { New-Item -Type File -Path $PROFILE -Force }; `
Add-Content \$PROFILE 'fnm env --use-on-cd | Out-String | Invoke-Expression'; `
fnm install 20; `
fnm use 20
```

Next, clone this repository:
```powershell
git clone https://github.com/disgustalt/Slackbot.git
```
<sub>You can add something like `mybot` to the end to make it clone into a special folder.<sub>

Move into the repository folder:
```powershell
cd Slackbot # Or something like 'cd mybot' if you specified a folder
```

Edit the config:
```powershell
nano config.js
```
Change the value of `bot_name` to whatever you want.
If you don't want a prefix on your command, you can set `prefix` to `false`.

Set up environment variables:
```powershell
nano .env
```
Set the file contents to:
```
SLACK_BOT_TOKEN=your_slack_bot(oauth)_token
SLACK_APP_TOKEN=your_slack_app_token
```

Finally, install packages and run the bot:
```powershell
npm install; `
node index.js
```
You can re-run this whenever :)

Go check out [Customizing](#customizing) to customize the bot ;)

### Linux

> [!NOTE]
> If you are not on a distribution such as Ubuntu or Debian, you can replace `apt install` with your OS's package manager's installation command (eg: `pkg install`, `apk add`, `pacman -S`, etc).

First, we can install the system packages:
```bash
apt install -y git nano curl && \
curl -fsSL https://fnm.vercel.app/install | bash && \
fnm install 20 && \
fnm use 20
```
<sub>Termux users can replace `nano` with `micro` for touch screen compatability.</sub>

Next, clone this repository:
```bash
git clone https://github.com/disgustalt/Slackbot.git
```
<sub>You can add something like `mybot` to the end to make it clone into a special folder.<sub>

Move into the repository folder:
```bash
cd Slackbot # Or something like 'cd mybot' if you specified a folder
```

Edit the config:
```bash
nano config.js # or 'micro config.js'
```
Change the value of `bot_name` to whatever you want.
If you don't want a prefix on your command, you can set `prefix` to `false`.

Set up environment variables:
```bash
nano .env # or 'micro .env'
```
Set the file contents to:
```
SLACK_BOT_TOKEN=your_slack_bot(oauth)_token
SLACK_APP_TOKEN=your_slack_app_token
```

Finally, install packages and run the bot:
```bash
npm install && \
node index.js
```
You can re-run this whenever :)

Go check out [Customizing](#customizing) to customize the bot ;)


## Customizing
ill update this laterrrr


## Keeping up-to-date
If you intend to just run the bot as is without any customization, you can follow these steps.

If you are on Windows, go to [this file](/scripts/convienientlyplacedfile.ps1).
If you are on Linux, go [here](/scripts/convienientlyplacedfile.sh).

Edit the files to:
Set `SLACK_BOT_TOKEN` to your Slack bot's OAuth token.
Set `SLACK_APP_TOKEN` to your Slack bot's app token.
Set `bot_name` to your Slack bot's name.
Set `prefix` to `false` *if* you don't want cpmmands tp be prefixed with the bot's name.