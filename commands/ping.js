import { Command } from '../utils/command-register.js';

export default async () => {
  Command("/dynamite-ping", async({ ack, respond }) => {
    const start = Date.now();
    try {
      await respond({
        text: `Pong!\nMy latency is ${start - Date.now()}ms.`
      });
    } catch (e) {
      await respond({
        text:"Uh oh, something went wrong!",
      }).catch();
      console.log(e);
    }
  });
};