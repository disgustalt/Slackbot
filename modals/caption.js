import { loadImage, createCanvas } from "@napi-rs/canvas";

export default async (app) => {
  app.view("captionup", async({ ack, view, body, client }) => {
    try {
      await ack();

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