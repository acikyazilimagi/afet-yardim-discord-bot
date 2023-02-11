const {Discord,ButtonBuilder,EmbedBuilder,ButtonStyle,ActionRowBuilder,MessageActionRow} = require("discord.js");

module.exports = {
	start: async (client, message, args) => {
		if (channel.name != 'adres-bildir') return;
		
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('adres-paylas')
				.setLabel('Adres Paylaş')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('nasil-paylasirim')
				.setLabel('Nasıl Paylaşırım?')
				.setStyle(ButtonStyle.Success)
		);
		const menu =  new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Adres Paylaşım')
        .setURL('https://discord.gg/itdepremyardim')
        .setAuthor({ name: 'Adres Paylaş', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.gg/itdepremyardim' })
        .setDescription('Adres Paylaşmak için Butona tıkla')


        message.channel.send({ embeds: [menu], components: [row] });
},

name: "adres-paylasim",
description: "",
aliases: [],
kategori: "",
usage: "",
}
