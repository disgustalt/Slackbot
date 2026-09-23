import { loadImage, createCanvas } from "@napi-rs/canvas";

export default async (app) => {
  app.view("captionup", async({ ack, view, body, client }) => {
    try {
      await ack();

      const txt = view.state.values.captionblock.captionin?.value;
      const imgurl = view.state.values.imgin.img?.files[0]?.url_private;

      if (!txt || !imgurl) return await client.chat.postMessage({
        channel_id: body.user.id,
        text: "Please provide a valid caption text and image to caption :)"
      });
      
      await client.files.uploadV2({
        channel_id: body.user.id,
        filename: "caption.png",
        file: buff
      });
    } catch {
      await client.chat.postMessage({
        channel: body.user.id,
        text: "Uh oh, something went wrong!"
      })
    }
  });
}