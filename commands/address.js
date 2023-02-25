const { ButtonBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const Buttons = require("../util/Buttons");
const Channels = require("../util/Channels");
const Constants = require("../util/Constants");

module.exports = {
	start: async (client, message, args) => {
		try {
			if (message.channel.name != Channels.AddressReportChannelName) return;

			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId(Buttons.ShareAddress)
					.setLabel('Adres Paylaş')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(Buttons.HowToShare)
					.setLabel('Nasıl Paylaşırım?')
					.setStyle(ButtonStyle.Success)
			);
			const menu = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('Adres Paylaşım')
				.setURL(Constants.DISCORD_INVITE_LINK)
				.setAuthor({ name: 'Adres Paylaş', iconURL: client.user.displayAvatarURL({ format: 'webp' }), url: Constants.DISCORD_INVITE_LINK })
				.setDescription('Adres Paylaşmak için Butona tıkla')


			message.channel.send({ embeds: [menu], components: [row] });
		} catch (error) {
			console.error(error);
		}

	},

	name: "adres-paylasim",
	description: "",
	aliases: [],
	category: "",
	usage: "",
	isSlashCommand: false
}
