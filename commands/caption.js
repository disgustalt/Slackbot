export default async (app) => {
  app.command("/dynamite-caption", async({ ack, client, command, respond }) => {
    try {
      await ack();
      await client.views.open({
        trigger_id: command.trigger_id,
        view: {
          type: "modal",
          callback_id: "captionup",
          title: {
            type: "plain_text",
            text: "Upload"
          },
          submit: {
            type: "plain_text",
            text: "Submit"
          },
          close: {
            type: "plain_text",
            text: "Cancel"
          },
          blocks: [
            {
              type: "input",
              block_id: "captionblock",
              element: {
                type: "plain_text_input",
                action_id: "captionin",
                placeholder: {
                  type: "plain_text",
                  text: "Enter caption text"
                }
              },
              label: {
                type: "plain_text",
                text: "Caption"
              }
            },
            {
              type: "input",
              block_id: "imgin",
              element: {
                type: "file_input",
                action_id: "img",
                filetypes: ["png", "jpg", "jpeg", "webm", "webp"],
                max_files: 1
              },
              label: {
                type: "plain_text",
                text: "Image to caption"
              }
            }
          ],
          private_metadata: command.channel_id
        }
      });
    } catch (e) {
      await respond({
        text: "Uh oh, Something went wrong!"
      });
      console.log(e);
    }
  });
};