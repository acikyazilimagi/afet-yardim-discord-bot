const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const client = require("../../bot");
const { Prefix } = require("../../config.js");

module.exports = {
  name: "messageCreate"
};

client.on('messageCreate', async (message) => {
  if (message.channel.type !== 0) return;
  if (message.author.bot) return;

  let prefix = Prefix;

  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;

  let command = client.prefix_commands.get(cmd);

  if (!command) return;

  if (command) {
    if (command.permissions) {
      if (!message.member.permissions.has(PermissionsBitField.resolve(command.permissions || []))) return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`🚫 İzinsiz kullanıldı.`)
            .setColor("Red")
        ]
      })
    };

    try {
      command.run(client, message, args);
    } catch (error) {
      console.error(error);
    };
  }
});
