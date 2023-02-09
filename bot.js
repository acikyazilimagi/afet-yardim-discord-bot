require("dotenv").config();
const { ButtonBuilder, ButtonStyle, MessageActionRow, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, Client, EmbedBuilder, Intents, Collection, GatewayIntentBits, Partials, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages], partials: [Partials.Channel] });
const db = require("nrc.db");
const message = require("./events/message");
let prefix = ayarlar.prefix;


client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./komutcalistirici`)(client);
});

client.on("ready", () => {
  require("./events/eventLoader")(client);
});

client.on(`interactionCreate`, (interaction) => {

  if (interaction.customId == "adres-paylas") {


    let sunucular = db.fetch("izinli_sunucular");
    if(!sunucular.includes(interaction.guild.id)) return interaction.reply({content: "Bu Sunucuda kullanım izni bulunmamaktadır."})


    const modal = new ModalBuilder()
      .setCustomId('adres-paylasim-modal')
      .setTitle('Deprem Adres Paylaş');
    const isimsoyisim = new TextInputBuilder()
      .setCustomId('deprem-isim-soyisim')
      .setLabel("İsim Soyisim bilgisini giriniz")
      .setStyle(TextInputStyle.Short)
      .setMinLength(1)
      .setMaxLength(100)
      .setRequired(false);

    const numara = new TextInputBuilder()
      .setCustomId('deprem-numara')
      .setLabel("Numara bilgisi giriniz")
      .setStyle(TextInputStyle.Short)
      .setMinLength(10)
      .setMaxLength(11)
      .setRequired(false);

    const adresbilgi = new TextInputBuilder()
      .setCustomId('deprem-adresi')
      .setLabel("Adres Bilgisini buraya yazınız.")
      .setPlaceholder('Adres Bilgisini buraya yazınız.')
      .setStyle(TextInputStyle.Paragraph)
      .setMinLength(1)
      .setMaxLength(1000)
      .setRequired(true);

    const modal_1 = new ActionRowBuilder().addComponents(isimsoyisim);
    const modal_2 = new ActionRowBuilder().addComponents(numara);
    const modal_3 = new ActionRowBuilder().addComponents(adresbilgi);

    modal.addComponents(modal_1, modal_2, modal_3);

    interaction.showModal(modal);
  }

 

})

client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId == "adres-paylasim-modal") {


    if(db.get("izinli_sunucular").includes(interaction.guild.id)){
      interaction.reply({ content: 'Bu sunucuda paylaşım yapma izni bulunmamaktadır.', ephemeral: true });
      return;
    }


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

    db.set("adres-paylasim-onaybekleyen-" + timestamp, [isim_soyisim ? isim_soyisim : "bos",numara ? numara : "bos",adres , interaction.user.id])

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
      .setAuthor({ name: 'Adres Paylaş Yönet', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.gg/sckmSsqqEa' })
      .setDescription(`
      
      İsim Soyisim: **${isim_soyisim ? isim_soyisim : "Değer Boş"}**
      Numara: **${numara ? numara : "Değer Boş"}**
      Adres; 
      **${adres ? adres : "Değer Boş"}**

      Paylaşan: <@${interaction.user.id}>

      Paylaşımın yapıldığı sunucu adı: **${interaction.guild.name}**

      `)
    client.channels.cache.get("1072881004013948928").send({ embeds: [menu], components: [row] });
  }
});


client.login(process.env.TOKEN);
