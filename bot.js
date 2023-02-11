require("dotenv").config();
const { ButtonBuilder, ButtonStyle, MessageActionRow, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, Client, EmbedBuilder, Intents, Collection, GatewayIntentBits, Partials, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages], partials: [Partials.Channel] });
const config = require("./config");

// Handler:
client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.user_commands = new Collection();
client.message_commands = new Collection();
client.modals = new Collection();
client.events = new Collection();

module.exports = client;

["prefix", "app_commands", "modals", "events"].forEach((file) => {
  require(`./handlers/${file}`)(client, config);
});


client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId == "adres-paylasim-modal") {

    const isim_soyisim = interaction.fields.getTextInputValue('deprem-isim-soyisim');
    const numara = interaction.fields.getTextInputValue('deprem-numara');
    const adres = interaction.fields.getTextInputValue('deprem-adresi');

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var date = new Date();
    var timestamp = Math.floor(date.getTime() / 1000) + getRandomInt(1, 1000);

    if(!adres){

      interaction.reply({ content: 'Adres boş olamaz', ephemeral: true });
      return;
    }

    console.log(isim_soyisim, numara, adres, timestamp)
    // APİYE BİLGİLERİ BURADAN GÖNDEREBİLİRSİNİZ


    interaction.reply({ content: 'Adres Paylaşım talebiniz alınmıştır yetkililerimiz en kısa sürede doğruluğunu kontrol edecektir', ephemeral: true });

    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('paylasimci-engelle-'+interaction.user.id)
        .setLabel('Paylaşımcıyı Engelle (süreli)')
        .setStyle(ButtonStyle.Success),
    )

      .addComponents(
        new ButtonBuilder()
          .setCustomId('paylasimci-banla-'+interaction.user.id)
          .setLabel('Paylaşımcıyı Banla')
          .setStyle(ButtonStyle.Danger),
      );

    const menu = new EmbedBuilder()
      .setColor(0x0099FF)
      .setAuthor({ name: 'Adres Paylaş Yönet', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.gg/itdepremyardim' })
      .setDescription(`
      
      İsim Soyisim: **${isim_soyisim ? isim_soyisim : "Değer Boş"}**
      Numara: **${numara ? numara : "Değer Boş"}**
      Adres; 
      **${adres ? adres : "Değer Boş"}**

      Paylaşan: <@${interaction.user.id}>

      Paylaşımın yapıldığı sunucu adı: **${interaction.guild.name}**

      `)
    client.channels.cache.get("1045694370713718874").send({ embeds: [menu], components: [row] });
  }
});


client.login(process.env.TOKEN);
