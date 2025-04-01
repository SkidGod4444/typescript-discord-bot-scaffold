import { Client } from "discord.js";
import { CONFIG } from "../../configs/config";

export default async function alive(client: Client) {
  client.on("ready", async () => {
    console.log(`${client.user?.username} is ready! 🤖`);

    client.user?.setPresence({
      activities: [
        {
          name: `Sponsor me on ${CONFIG.SPONSOR_URL}`,
          type: 3,
        },
      ],
      status: "dnd",
    });
  });
}