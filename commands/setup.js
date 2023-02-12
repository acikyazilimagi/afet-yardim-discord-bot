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

		const botMember = guild.members.cache.get(client.user.id);

		if (!botMember.permissions.has(PermissionsBitField.Flags.Administrator))
			return message.channel.send('Bu işlemi gerçekleştirebilmek için ADMINISTRATOR yetkisine ihtiyacım var.');
		
		if (
			!message.member.permissions.has(PermissionsBitField.Flags.Administrator)
		)
			return;

		let channel = guild.channels.cache.find((c) => c.name === 'adres-bildir');

		if (!channel) {
			channel = await guild.channels.create({
				name: 'adres-bildir',
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
		}

		message.channel.send(`${channel} adlı kanal bulundu, oluşturulmayacak.`);

		let logChannel = guild.channels.cache.find((c) => c.name === 'adres-bildir-log');

		if (!logChannel) {
			await guild.channels.create({
				name: 'adres-bildir-log',
				type: 0,
				permissionOverwrites: [
					{
						id: guild.roles.everyone,
						deny: [PermissionsBitField.Flags.ViewChannel],
					},
				],
			});
		}

		message.channel.send(`${logChannel} adlı kanal bulundu, oluşturulmayacak.`);
	},

	name: 'setup',
	description: '',
	aliases: [],
	kategori: '',
	usage: '',
};
