const {
	Discord,
	ButtonBuilder,
	EmbedBuilder,
	ButtonStyle,
	ActionRowBuilder,
	MessageActionRow,
	PermissionsBitField,
} = require('discord.js');

module.exports = {
	start: async (client, message, args) => {
		const { guild } = message;

		if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

		const channel = await guild.channels.create({
			name: 'adres-bildir',
			type: 0,
			permissionOverwrites: [
				{ id: guild.roles.everyone, deny: [PermissionsBitField.Flags.SendMessages], allow: [PermissionsBitField.Flags.ViewChannel] },
			],
		});

		const logChannel = guild.channels.create({
			name: 'adres-bildir-log',
			type: 0,
			permissionOverwrites: [
				{
					id: guild.roles.everyone,
					deny: [PermissionsBitField.Flags.ViewChannel],
				},
			],
		});

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
		const menu = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle('Adres Paylaşım')
			.setURL('https://discord.gg/itdepremyardim')
			.setAuthor({
				name: 'Adres Paylaş',
				iconURL: 'https://i.imgur.com/AfFp7pu.png',
				url: 'https://discord.gg/itdepremyardim',
			})
			.setDescription('Adres Paylaşmak için Butona tıkla');

		channel.send({ embeds: [menu], components: [row] });
	},

	name: 'setup',
	description: '',
	aliases: [],
	kategori: '',
	usage: '',
};
