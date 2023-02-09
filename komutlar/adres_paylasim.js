const {Discord,ButtonBuilder,EmbedBuilder,ButtonStyle,ActionRowBuilder,MessageActionRow} = require("discord.js");
const ayarlar = require("../ayarlar.json");

module.exports = {
    calistir: async(client, message, args) => {

        let sunucular = db.fetch("izinli_sunucular");
        if(!sunucular.includes(interaction.guild.id)) return interaction.reply({content: "Bu Sunucuda kullanım izni bulunmamaktadır."})
        

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setCustomId('adres-paylas')
					.setLabel('Adres Paylaş')
					.setStyle(ButtonStyle.Primary),
			);
		const menu =  new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Adres Paylaşım')
        .setURL('https://discord.gg/sckmSsqqEa')
        .setAuthor({ name: 'Adres Paylaş', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.gg/sckmSsqqEa' })
        .setDescription('Adres Paylaşmak için Butona tıkla')


        message.channel.send({ embeds: [menu], components: [row] });
},

name: "adres-paylasim",
description: "",
aliases: [],
kategori: "",
usage: "",
}