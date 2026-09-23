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

await app.start();
console.log("bot is running!");