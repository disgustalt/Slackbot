import { loadImage, createCanvas } from "@napi-rs/canvas";

export default async (app) => {
  app.view("captionup", async ({ ack, view, client }) => {
    try {
      await ack();

      const txt = view.state.values.captionblock.captionin?.value;
      console.log(txt);
      console.log(view.state.values)
      const imgurl = view.state.values.imgin.img?.files[0]?.url_private;

      if (!txt || !imgurl) {
        return await client.chat.postMessage({
          channel: view.private_metadata,
          text: "Please provide a valid caption text and image to caption :)"
        });
      }

      const res = await fetch(imgurl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
        }
      });

      if (!res.ok) throw new Error("failed to fetch img");

      const resbuff = await res.arrayBuffer();
      const img = await loadImage(resbuff);

      const fontSize = Math.max(
        32,
        Math.min(72, Math.floor(img.width / 12))
      );

      const padding = Math.max(30, Math.floor(img.width / 25));
      const maxWidth = img.width - padding * 2;
      const lineHeight = Math.floor(fontSize * 1.2);

      const temp = createCanvas(img.width, 100);
      const tc = temp.getContext("2d");

      tc.font = `bold ${fontSize}px Arial`;

      const words = txt.trim().split(/\s+/);
      const lines = [];
      let line = "";

      for (const word of words) {
        const test = line ? `${line} ${word}` : word;

        if (tc.measureText(test).width <= maxWidth) {
          line = test;
        } else {
          if (line) lines.push(line);

          if (tc.measureText(word).width > maxWidth) {
            let part = "";

            for (const char of word) {
              const testPart = part + char;

              if (tc.measureText(testPart).width <= maxWidth) {
                part = testPart;
              } else {
                if (part) lines.push(part);
                part = char;
              }
            }

            line = part;
          } else {
            line = word;
          }
        }
      }

      if (line) lines.push(line);

      const captionHeight = Math.max(
        120,
        padding + lines.length * lineHeight + padding
      );

      const canvas = createCanvas(
        img.width,
        img.height + captionHeight
      );

      const c = canvas.getContext("2d");

      c.fillStyle = "white";
      c.fillRect(0, 0, canvas.width, canvas.height);

      c.drawImage(
        img,
        0,
        captionHeight,
        img.width,
        img.height
      );

      c.fillStyle = "black";
      c.font = `bold ${fontSize}px Arial`;
      c.textAlign = "center";
      c.textBaseline = "middle";

      const textStart = (captionHeight - lines.length * lineHeight) / 2;

      lines.forEach((line, i) => {
        c.fillText(
          line,
          canvas.width / 2,
          textStart + i * lineHeight + lineHeight / 2
        );
      });

      const buff = canvas.toBuffer("image/png");

      const up = await client.files.getUploadURLExternal({
        filename: "caption.png",
        length: buff.length
      });

      const upload = await fetch(up.upload_url, {
        method: "POST",
        headers: {
          "Content-Type": "image/png"
        },
        body: buff
      });

      if (!upload.ok) throw new Error(upload);

      const final = await client.files.completeUploadExternal({
        files: [
          {
            id: up.file_id,
            title: "caption"
          }
        ],
        channels: String(view.private_metadata)
      });
    } catch (e) {
      await client.chat.postMessage({
        channel: view.private_metadata,
        text: "Uh oh, something went wrong!"
      });

      console.log(e);
    }
  });
};