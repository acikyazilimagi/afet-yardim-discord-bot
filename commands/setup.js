const {
	ButtonBuilder,
	EmbedBuilder,
	ButtonStyle,
	ActionRowBuilder,
	PermissionsBitField
} = require('discord.js');

const Buttons = require('../util/Buttons');
const Channels = require('../util/Channels');
const Constants = require('../util/Constants');

module.exports = {
	start: async (client, message, args) => {
		try {
			const { guild } = message;
			const botMember = await guild.members.fetch(client.user.id);
			if (!botMember.permissions.has(PermissionsBitField.Flags.Administrator))
				return message.channel.send('Bu işlemi gerçekleştirebilmek için ADMINISTRATOR yetkisine ihtiyacım var.');



			if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
				return message.channel.send('Bu işlemi gerçekleştirebilmek için ADMINISTRATOR yetkisine ihtiyacın var.');;

			let channel = guild.channels.cache.find((c) => c.name === Channels.AddressReportChannelName);

			if (!channel) {
				channel = await guild.channels.create({
					name: Channels.AddressReportChannelName,
					type: 0,
					permissionOverwrites: [
						{
							id: guild.roles.everyone,
							deny: [PermissionsBitField.Flags.SendMessages],
							allow: [PermissionsBitField.Flags.ViewChannel],
						},
					],
				});

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
					.setColor(0x0099ff)
					.setTitle('Adres Paylaşım')
					.setURL(Constants.DISCORD_INVITE_LINK)
					.setAuthor({
						name: 'Adres Paylaş',
						iconURL: client.user.displayAvatarURL({ format: 'webp' }),
						url: Constants.DISCORD_INVITE_LINK,
					})
					.setDescription('Adres Paylaşmak için Butona tıkla');
				channel.send({ embeds: [menu], components: [row] });
			}

			message.channel.send(`${channel} adlı kanal bulundu, yeni bir kanal oluşturulmayacak.`);

			let logChannel = guild.channels.cache.find(
				(c) => c.name === Channels.AddressReportLogChannelName
			);


			if (!logChannel) {
				await guild.channels.create({
					name: Channels.AddressReportLogChannelName,
					type: 0,
					permissionOverwrites: [
						{
							id: guild.roles.everyone,
							deny: [PermissionsBitField.Flags.ViewChannel],
						},
					],
				});
			}


			message.channel.send(`${logChannel} adlı kanal bulundu, yeni bir kanal oluşturulmayacak.`);

		} catch (error) {
			console.error(error);
		}
	},

	name: 'setup',
	description: '',
	aliases: [],
	category: '',
	usage: '',
	isSlashCommand: false
};
