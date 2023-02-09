const { Discord, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("nrc.db");


module.exports = {
    calistir: async (client, message, args) => {

        let sunucular = db.fetch("izinli_sunucular");
        if(!sunucular.includes(interaction.guild.id)) return interaction.reply({content: "Bu Sunucuda kullanım izni bulunmamaktadır."})

        let channel = message.mentions.channels.first()

        
        if (!channel) {
            return message.channel.send("Lütfen geçerli bir kanal belirtiniz.");
        }

        const permission = channel.permissionsFor(message.client.user);

        if (!permission.has(PermissionsBitField.Flags.ViewChannel)) {
            return message.channel.send("Kanalı görüntüleme iznim yok.");
        }

        if (!permission.has(PermissionsBitField.Flags.SendMessages)) {
            return message.channel.send("Kanalda mesaj gönderme iznim yok.");
        }
        if (!permission.has(PermissionsBitField.Flags.EmbedLinks)) {
            return message.channel.send("Embed yetkim yok.");
        }

        db.set("adres_paylasim_"+message.guildId, channel.id)

        message.channel.send("Başarılı bir şekilde **Adres Paylaşım** bildirim kanalı <#"+channel.id+"> olarak ayarlandı")
    },

    name: "adres-paylasim-kanal",
    description: "",
    aliases: [],
    kategori: "",
    usage: "",
}