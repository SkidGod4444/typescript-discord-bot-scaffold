import {
  Client,
  Message,
  TextChannel,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type Interaction,
} from "discord.js";
import { addCount, removeCount, getCount } from "../../db/init";

export default {
  name: "counter",
  aliases: ["count", "c"],
  adminPermit: false,
  ownerPermit: false,
  cat: "bot",
  run: async (client: Client, message: Message) => {
    let count = await getCount(message.author.id); // Fetch initial count

    const add1 = async (interaction: Interaction) => {
      if (!interaction.isButton()) return;
      if (interaction.customId !== "add_count") return;

      count = await addCount(interaction.user.id); // Update count with returned value
      console.log(count);
      await interaction.update({
        embeds: [generateEmbed()],
        components: [generateButtons()],
      });
    };

    const remove1 = async (interaction: Interaction) => {
      if (!interaction.isButton()) return;
      if (interaction.customId !== "remove_count") return;

      count = await removeCount(interaction.user.id); // Update count with returned value
      console.log(count);
      await interaction.update({
        embeds: [generateEmbed()],
        components: [generateButtons()],
      });
    };

    const generateEmbed = () => {
      return new EmbedBuilder()
        .setTitle("This is a Demo!")
        .setDescription(`Click on any of these buttons to see your database changes. \n\n **COUNT:** *${count}*`)
    };

    const generateButtons = () => {
      return new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().setCustomId("add_count").setStyle(ButtonStyle.Primary).setLabel("Add (+1)"),
        new ButtonBuilder().setCustomId("remove_count").setStyle(ButtonStyle.Danger).setLabel("Minus (-1)")
      );
    };

    if (message.channel instanceof TextChannel) {
      const msg = await message.channel.send({ embeds: [generateEmbed()], components: [generateButtons()] });

      const collector = msg.createMessageComponentCollector({ time: 60000 });

      collector.on("collect", async (interaction) => {
        if (interaction.customId === "add_count") await add1(interaction);
        if (interaction.customId === "remove_count") await remove1(interaction);
      });

      collector.on("end", () => {
        msg.edit({ components: [] });
      });
    }
  },
};