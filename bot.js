require("dotenv").config();
const { ButtonBuilder, ButtonStyle, MessageActionRow, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, Client, EmbedBuilder, Intents, Collection, GatewayIntentBits, Partials, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages], partials: [Partials.Channel] });
const message = require("./events/message");


client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./commandstarter`)(client);
});

client.on("ready", () => {
  require("./events/eventLoader")(client);
});

client.on(`interactionCreate`, (interaction) => {

  if (interaction.customId == "nasil-paylasirim") {
    const menu = new EmbedBuilder()
      .setColor(0x0099FF)
      .setDescription(`
      BURAYA ÖNEMLİ BİR MESAJ GELECEK
      `)
    interaction.reply({ embeds: [menu] , ephemeral: true })
  }

  if (interaction.customId == "adres-paylas") {


    const modal = new ModalBuilder()
      .setCustomId('adres-paylasim-modal')
      .setTitle('Deprem Adres Paylaş');

    const adresbilgi = new TextInputBuilder()
			.setCustomId('deprem-adresi')
			.setLabel('Adres Bilgisi')
			.setPlaceholder('Devlet, TBMM, 06420 Çankaya/Ankara')
			.setStyle(TextInputStyle.Paragraph)
			.setMinLength(15)
			.setMaxLength(400)
			.setRequired(true);

    const modal_1 = new ActionRowBuilder().addComponents(adresbilgi);


    modal.addComponents(modal_1);

    interaction.showModal(modal);
  }

})

client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId == "adres-paylasim-modal") {

    const adres = interaction.fields.getTextInputValue('deprem-adresi');

    if(!adres){
      interaction.reply({ content: 'Adres boş olamaz', ephemeral: true });
      return;
    }


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
      
      Adres; 
      **${adres ? adres : "Değer Boş"}**

      Paylaşan: <@${interaction.user.id}>

      Paylaşımın yapıldığı sunucu adı: **${interaction.guild.name}**

      `)
    client.channels.cache.get("1073297814865575977").send({ embeds: [menu], components: [row] });
  }
});


client.login(process.env.TOKEN);