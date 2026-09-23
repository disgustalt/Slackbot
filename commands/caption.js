export default async (app) => {
  app.command("/dynamite-caption", async({ ack, client, command }) => {
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
            
          }
        ]
      }
    });
  });
};