# Dynamite
A simple Slack bot made in JavaScript :)

---

## Contents
- [My yap](#yap)
- [Features](#features)
- [Running it yourself](#running-the-bot-yourself)

---

## Yap
Dynamite is a simple Slack bot made using the `@slack/bolt` npm package.

All commands are imported from [/modals](/modals) (obviously)
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

### Linux

> [!NOTE]
> If you are not on a distribution such as Ubuntu or Debian, you can replace `apt install` with your OS's package manager's installation command (eg: `pkg install`, `apk add`, `pacman -S`, etc).

First, we can install the packages we'll need:
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
cd Slackbot # Or 'cd mybot' if you specified a folder
```

Edit the config:
```bash
nano config.js # or 'micro config.js'
```
Change the value of `bot_name` to whatever you want.
If you don't want a prefix on your command, you can set `prefix` to `false`.
