import { loadImage, createCanvas, GlobalFonts } from "@napi-rs/canvas";
try {
  GlobalFonts.registerFromPath(
    "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
    "DejaVu"
  );
} catch {}

export default async (app) => {
  app.view("captionup", async({ ack, view, client }) => {
    try {
      await ack();

      const txt = view.state.values.captionblock.captionin?.value;
      const imgurl = view.state.values.imgin.img?.files[0]?.url_private;

      if (!txt || !imgurl) return await client.chat.postMessage({
        channel: view.private_metadata,
        text: "Please provide a valid caption text and image to caption :)"
      });

      const res = await fetch(imgurl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
        }
      });

      if (!res.ok) throw new Error("failed to fetch img");

      const resbuff = await res.arrayBuffer();
      const img = await loadImage(resbuff);

      GlobalFonts.loadSystemFonts();

      console.log(GlobalFonts.families);

      const canvas = createCanvas(img.width, img.height + 100);
      const c = canvas.getContext("2d");

      c.fillStyle = "white";
      c.fillRect(0, 0, canvas.width, canvas.height);

      c.drawImage(img, 0, 100);

      c.fillStyle = "black";
      c.font = `bold ${Math.min(60, canvas.width / 15)}px DejaVu`;
      c.textAlign = "center";
      c.textBaseline = "middle";

      const maxwidth = canvas.width - 40;
      const words = txt.trim().split(/\s+/);
      let lines = [];
      let line = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = c.measureText(line + " " + word).width;

        if (width < maxwidth) {
          line += " " + word;
        } else {
          lines.push(line);
          line = word;
        }
      }

      lines.push(line);

      const height = Math.min(60, canvas.width / 15);
      const y1 = 50 - ((lines.length - 1) * height) / 2;

      lines.forEach((line, i) => {
        c.fillText(
          line,
          canvas.width / 2,
          y1 + i * height
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