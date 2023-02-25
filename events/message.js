const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    const prefix = '!d'
    let client = message.client;

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    if (!message.guild) return message.reply("Komutlarım sadece sunucularda kullanılabilir.")

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    if (commandName.length === 0) return;

    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command || command.isSlashCommand) return;

    if (command) {
      try {
        command.start(client, message, args)
      } catch (error) {
        console.log(error)
      }
    } else
      return
  }
}
