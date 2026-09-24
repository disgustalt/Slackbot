export default async (app) => {
  app.command("/dynamite-fact", async({command, ack, respond}) => {
    await ack();
    try {
      const req = await fetch(`https://api.popcat.xyz/v2/fact`);
      const res = await req.json();
      const fact = res.message.fact;
      await respond({ text: fact });
    } catch (e) {
      await respond({ text: "Uh oh, something went wrong \;)" });
      console.log(e);
    }
  });
};