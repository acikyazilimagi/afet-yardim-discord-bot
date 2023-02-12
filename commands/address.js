const { ButtonBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { Buttons } = require("../handlers/interactionHandlers/buttonHandlers");
const Channels = require("../util/Channels");
const Constants = require("../util/Constants");

module.exports = {
	start: async (client, message, args) => {
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
			.setAuthor({ name: 'Adres Paylaş', iconURL: client.user.displayAvatarURL({format:'webp'}), url: Constants.DISCORD_INVITE_LINK })
			.setDescription('Adres Paylaşmak için Butona tıkla')


		message.channel.send({ embeds: [menu], components: [row] });
	},

	name: "adres-paylasim",
	description: "",
	aliases: [],
	category: "",
	usage: "",
	isSlashCommand: false
}
