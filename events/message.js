const { EmbedBuilder } = require("discord.js");

module.exports = async(message) => {
      const prefix = '!d'
      let client = message.client;

        if (message.author.bot || !message.content.startsWith(prefix)) return;
         
        if (!message.guild) return message.reply("Komutlarım sadece sunucularda kullanılabilir.")
      
        const args = message.content.slice(prefix.length).trim().split(/ +/g); 
        const cmd = args.shift().toLowerCase(); 
      
        if (cmd.length === 0) return; 
      
        var command = client.commands.get(cmd); 
        if (!command) command = client.commands.get(client.aliases.get(cmd));
      
      
        if (command) 
        {
          try {
            command.start(client, message, args,)
          } catch (error) {
            console.log(error)
          }
        }  else 
        return 
}
