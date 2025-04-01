import { Client, Collection, EmbedBuilder, Partials } from "discord.js";
import { AsciiTable3 } from "ascii-table3";
import { readdirSync } from "fs";
import clientjson from "./configs/client.json";
import { CONFIG } from "./configs/config";
import { log_error } from "./lib/loggers";

export const CommandsTable = new AsciiTable3().setHeading(
  "Message Commands",
  "Status",
);
export const EventsTable = new AsciiTable3().setHeading(
  "Client Events",
  "Status",
);

const client = new Client({
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "GuildInvites",
    "GuildEmojisAndStickers",
    "GuildBans",
    "GuildWebhooks",
    "GuildPresences",
    "MessageContent",
  ],
  allowedMentions: {
    repliedUser: true,
    parse: ["everyone", "roles", "users"],
  },
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ],
});

client.commands = new Collection();
client.config = clientjson;

export const loadCommands = async (client: Client) => {
  const commandDirs = readdirSync("./src/commands/");
  for (const dir of commandDirs) {
    const commandFiles = readdirSync(`./src/commands/${dir}`).filter(
      (f) => f.endsWith(".js") || f.endsWith(".ts"),
    );
    for (const file of commandFiles) {
      try {
        const cmd = await import(`../src/commands/${dir}/${file}`).then(
          (mod) => mod.default,
        ); // Dynamic import
        if (cmd?.name) {
          client.commands.set(cmd.name, cmd);
          CommandsTable.addRow(`${dir}.${file.split(".")[0]}`, "✅");
        }
      } catch (err) {
        console.error(`Error loading command file ${file}:`, err);
        CommandsTable.addRow(`${dir}.${file.split(".")[0]}`, "❌");
      }
    }
  }
  setTimeout(() => {
    console.log(CommandsTable.toString());
  }, 3000 * commandDirs.length);
};

export const loadEvents = async (client: Client) => {
  const eventDirs = readdirSync("./src/events/");
  for (const dir of eventDirs) {
    const eventFiles = readdirSync(`./src/events/${dir}`).filter(
      (f) => f.endsWith(".js") || f.endsWith(".ts"),
    );
    for (const file of eventFiles) {
      try {
        const event = await import(`../src/events/${dir}/${file}`).then(
          (mod) => mod.default,
        ); // Dynamic import
        event(client);
        const eventName = `${dir}.${file.split(".")[0]}`;
        EventsTable.addRow(eventName, "✅");
      } catch (err) {
        console.error(`Error loading event file ${file}:`, err);
        const eventName = `${dir}.${file.split(".")[0]}`;
        EventsTable.addRow(eventName, "❌");
      }
    }
  }
  setTimeout(() => {
    console.log(EventsTable.toString());
  }, 3000 * eventDirs.length);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  log_error.send({
    embeds: [
      new EmbedBuilder()
        .setColor(`#2f3136`)
        .setDescription(`\`\`\`ts\n${err}\`\`\``),
    ],
  });
});

process.on("uncaughtException", (er) => {
  console.error(er);
  log_error.send({
    embeds: [
      new EmbedBuilder()
        .setColor(`#2f3136`)
        .setDescription(`\`\`\`ts\n${er}\`\`\``),
    ],
  });
});
const start = async () => {
  loadCommands(client);
  loadEvents(client);
  client.login(CONFIG.DISCORD_TOKEN);
};

start();

export default client;