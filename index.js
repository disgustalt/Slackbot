import "dotenv/config";
import path from "path";
import fs from "fs"
import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

const load = async () => {
  const paths = ["/commands", "/modals"];
  for (const dir of paths) {
    const p = path.join(import.meta.dirname, dir);
    if (fs.existsSync(p)) {
      const files = fs.readdirSync(p);
      for (const f of files) {
        if (f.endsWith('.js')) {
          const file = path.join(p, f);
          console.log(file);
          const cf = await import(file);
          cf.default(app);
        }
      }
    }
  }
};

load();

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

await app.start();
console.log("bot is running!");