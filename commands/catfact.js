export default async (app) => {
  app.command("/dynamite-catfact", async({command, ack, respond}) => {
    await ack();
    try {
      const req = await fetch("https://cat.ninja/fact", { method: 'GET' });
      const res = await req.json();
      const fact = res.data.fact;
      await respond({ text: fact });
    } catch (e) {
      await respond({ text: "Uh oh, something went wrong \;)" });
      console.log(e);
    }
  });
};