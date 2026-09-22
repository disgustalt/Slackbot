require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/dynamite-ping", async ({ command, ack, respond }) => {const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/dynamite-catfact", async({command, ack, respond}) => {
  await ack();
  try {
    const req = await fetch("https://cat.ninja/fact", { method: 'GET' });
    const res = await req.json();
    const fact = res.data.fact;
    await respond({ text: fact });
  } catch (e) {
    await respond({ text: "Uh oh, something went wrong \;)" })
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();