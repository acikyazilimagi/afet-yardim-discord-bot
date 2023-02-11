const client = require("../../bot");
const config = require("../../config.js");
const { ButtonBuilder, ButtonStyle, MessageActionRow, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, Client, EmbedBuilder, Intents, Collection, GatewayIntentBits, Partials, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require('discord.js');

module.exports = {
  name: "interactionCreate"
};

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.slash_commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction, config);
    } catch (e) {
      console.error(e)
    };
  };

  if (interaction.isModalSubmit()) {
    const modal = client.modals.get(interaction.customId);

    if (!modal) console.log("Bir şeyler ters gitti.");

    try {
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
          client.channels.cache.get("1073752425346908281").send({ embeds: [menu], components: [row] });
        }
      
    } catch (e) {
      console.error(e)
    };
  }
});

