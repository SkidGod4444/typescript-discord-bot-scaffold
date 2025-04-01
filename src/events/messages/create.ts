import { Client, Message } from "discord.js";

export default async function handleMessageCreate(
  client: Client & { config: { owner: string[]; noprefix: string[] } },
): Promise<void> {
  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return;

    const noprefixUsers = [...client.config.owner, ...client.config.noprefix];

    const prefix = client.config?.prefix;
    // Check if the message starts with the prefix, or if the author is not noprefix user.
    if (
      !message.content.startsWith(prefix) &&
      !noprefixUsers.includes(message.author.id)
    )
      return;

    // Get the command name
    let args;
    let commandName: string | undefined;
    if (message.content.startsWith(prefix)) {
      args = message.content.slice(prefix.length).trim().split(/ +/);
      commandName = args.shift()?.toLowerCase();
    } else if (noprefixUsers.includes(message.author.id)) {
      args = message.content.trim().split(/ +/);
      commandName = args.shift()?.toLowerCase();
    }

    // If a command is found, execute it
    if (!commandName) return;

    let command = client.commands.find(
      (cmd) => cmd.name === commandName || cmd.aliases?.includes(commandName),
    );

    if (command) {
      try {
        await command.run(client, message, args, prefix);
      } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
      }
    } else {
      return;
    }
  });
}