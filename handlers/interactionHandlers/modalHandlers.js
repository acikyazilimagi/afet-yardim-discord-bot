const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { eventsService } = require('../../services/eventsService');
const Channels = require('../../util/Channels');
const Constants = require('../../util/Constants');
const Modals = require('../../util/Modals');
const TextInputs = require('../../util/TextInputs');
let timeouts = []

const modalSubmitHandler = async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === Modals.ShareAddressModal)
    return await shareAddressModalHandler(interaction)

}
const shareAddressModalHandler = async (interaction) => {

  const {client}=interaction
  const adres = interaction.fields.getTextInputValue(TextInputs.EarthquakeAddress);
  const googleMapsURL = interaction.fields.getTextInputValue(TextInputs.GoogleMapsLocationUrl);

  if (!adres) {
    return interaction.reply({ content: 'Adres boş olamaz', ephemeral: true });   
  }

  if (timeouts.find(element => element[0] == interaction.user.id) && !timeouts.find(element => element[1].timeoutEnded)) {
    return interaction.reply({ content: 'Geçiçi olarak engellendiniz', ephemeral: true })
  }

  else {
    interaction.reply({ content: 'Adres Paylaşım talebiniz alınmıştır.', ephemeral: true });
    try {
      timeouts = timeouts.filter(element => element[0] != interaction.user.id)
    } catch(error) {
        console.log(error)
    }

  }

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('paylasimci-engelle-' + interaction.user.id)
        .setLabel('Paylaşımcıyı Engelle (süreli)')
        .setStyle(ButtonStyle.Success),
    )

    .addComponents(
      new ButtonBuilder()
        .setCustomId('paylasimci-banla-' + interaction.user.id)
        .setLabel('Paylaşımcıyı Banla')
        .setStyle(ButtonStyle.Danger),
    );

  const menu = new EmbedBuilder()
    .setColor(0x0099FF)
    .setAuthor({ name: 'Adres Paylaş Yönet', iconURL: client.user.displayAvatarURL({format:'webp'}), url: Constants.DISCORD_INVITE_LINK })
    .setDescription(`

Adres; 
**${adres ? adres : "Değer Boş"}**

Google Maps URL **${ googleMapsURL ? googleMapsURL : "Boş"}**

Paylaşan: <@${interaction.user.id}>

Paylaşımın yapıldığı sunucu adı: **${interaction.guild.name}**

`)

  let user_id = interaction.user.id //getting user id that filled form
  const guild_id = interaction.guildId; // guild id
  const server = client.guilds.cache.get(guild_id); //getting guild
  const server_channel = server.channels.cache.find(c => c.name == Channels.AddressReportLogChannelName); // getting server_channel
  client.channels.cache.get(server_channel.id).send({ embeds: [menu], components: [row] }); // sending message to server_channel
  //ban and timeout buttons interactions
  const extraParameters={
    user_id: interaction.user.id,
    channel_id: interaction.channelId,
    username: interaction.user.username,
    discord_message_id: interaction.message.id,
    guild_id: interaction.guildId,
    guild_name: interaction.message.guild.name,
    message_created_at: interaction.message.createdAt,
    googleMapsURL: googleMapsURL
  }

  //response from service can be handled here
  const response = await eventsService(adres,extraParameters);
  

  const filter = i => i.customId.startsWith(`paylasimci-engelle`) || i.customId.startsWith(`paylasimci-banla`)

  const collector = server_channel.createMessageComponentCollector({ filter, time: 864000000 });

  collector.once('collect', async i => {

    if (i.customId.startsWith('paylasimci-engelle-')) {
      //await i.reply(`interaction: ${user_id}, buton: ${i.user.id}`)
      await i.reply("User has been timeouted for 10 minutes")

      const Timeout = {
        timeoutEnded: false,
        timeout: null,
      };

      Timeout.timeout = setTimeout(() => {
        Timeout.timeoutEnded = true;
      }, 30 * 1000);
      timeouts.push([user_id, Timeout])

    }
    if ((i.customId.startsWith('paylasimci-banla-'))) {
      let member = await server_channel.guild.members.fetch(user_id);
      member.ban({ reason: 'Banned' });
      await i.reply(`User with id ${user_id} has been banned.`)

    }


  })
}

module.exports = {
  modalSubmitHandler
};
