const axios = require("axios");
require("dotenv").config();
const express = require('express');
const app = express();
const { ButtonBuilder, ButtonStyle, MessageActionRow, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, Client, EmbedBuilder, Intents, Collection, GatewayIntentBits, Partials, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager, time } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages], partials: [Partials.Channel] });
const message = require("./events/message");

// DİSCORD BOT
const channel_name = 'adres-bildir-log'; //keyword
let timeouts = []

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
  "Mesajınızı yazarken, ihtiyacı olan insanların neye ihtiyacı olduğu ve lokasyon olarak nerede bulunduğunu detaylı bir şekilde yazmanız çok önemli. Lütfen 'Hatay' diyip bırakmayınız. Olabildiğince açıklayınız. Lütfen bilgilerini teyit etmeye çalışınız, bilginin doğruluğu en önemli şey bizim için. Formun içinde google maps link bölümü bulunuyor. Lütfen olabildiğince uğraşıp kişinin google maps üzerinden bulunduğu lokasyonun linkini alıp gönderiniz."
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
    .setPlaceholder('Acilen bebek maması ihtiyacı var, General Şükrü Kanadli Mahallesi....')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(15)
    .setMaxLength(400)
    .setRequired(true);

    const googleMapsInput = new TextInputBuilder()
    .setCustomId('deprem-google-maps-url')
    .setLabel('google maps link (lütfen araştırıp bulun)')
    .setPlaceholder('https://goo.gl/maps/3jA1dDLsH9Kq3LEt6 (eğer elinizde yoksa opsiyonel)')
    .setStyle(TextInputStyle.Short)
    .setMinLength(30)
    .setMaxLength(40)
    .setRequired(false);
    const modal_1 = new ActionRowBuilder().addComponents(adresbilgi);
    const model_2 = new ActionRowBuilder().addComponents(googleMapsInput);
    modal.addComponents(modal_1, model_2);

    interaction.showModal(modal);
  }

})

client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId == "adres-paylasim-modal") {

    const adres = interaction.fields.getTextInputValue('deprem-adresi');
    const googleMapsURL = interaction.fields.getTextInputValue('deprem-google-maps-url');

    if(!adres){
      interaction.reply({ content: 'Adres boş olamaz', ephemeral: true });
      return;
    }

    if(timeouts.find(element => element[0] == interaction.user.id) && !timeouts.find(element => element[1].timeoutEnded)) {
      return interaction.reply({ content: 'Geçiçi olarak engellendiniz', ephemeral: true })
    }

    else {
      interaction.reply({ content: 'Adres Paylaşım talebiniz alınmıştır.', ephemeral: true });
      try {
        timeouts = timeouts.filter(element => element[0] != interaction.user.id)
      }catch {

      }

    }

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

Google Maps URL **${ googleMapsURL ? googleMapsURL : "Boş"}**

Paylaşan: <@${interaction.user.id}>

Paylaşımın yapıldığı sunucu adı: **${interaction.guild.name}**

`)

    let user_id = interaction.user.id //getting user id that filled form
    const guild_id = interaction.guildId; // guild id
    const server = client.guilds.cache.get(guild_id); //getting guild
    const server_channel = server.channels.cache.find(c => c.name == channel_name); // getting server_channel
    client.channels.cache.get(server_channel.id).send({ embeds: [menu], components: [row] }); // sending message to server_channel
    //ban and timeout buttons interactions
    
    const response = { 
        'feeds': [
          {
            "raw_text": adres,
            "channel": "discord",
            "extra-parameters": {
      user_id: interaction.user.id,
      channel_id: interaction.channelId,
      username: interaction.user.username,
      discord_message_id: interaction.message.id,
      guild_id: interaction.guildId,
      guild_name: interaction.message.guild.name,
      message_created_at: interaction.message.createdAt,
      googleMapsURL: googleMapsURL
    },
          "epoch": Date.now()
            }      
        ]
    }

    const Url = `${process.env.BACKEND_GO_API_URL}/events`;        
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "x-api-key": process.env.BACKEND_GO_API_KEY
      },
      data: JSON.stringify(response),
      url: Url,
    };

     axios(options).then(async function (response) {
      console.log(1);
    }).catch(err => {
      console.log(err.response.status)
    })
    
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
        }, 30*1000);
        timeouts.push([user_id,Timeout]) 

      }
      if ((i.customId.startsWith('paylasimci-banla-'))) {
        let member = await server_channel.guild.members.fetch(user_id);
        member.ban({ reason: 'Banned' });
        await i.reply(`User with id ${user_id} has been banned.`)

      }


    })
  }
});

// HEALTHCHECK
client.login(process.env.TOKEN);

app.use("/healthcheck", require('express-healthcheck')({
  healthy: () => {
    return { status: "healthy" }
  }
}));


app.listen(3000);
