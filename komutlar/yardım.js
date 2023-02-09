const {Discord,EmbedBuilder} = require("discord.js");



module.exports = {
    calistir: async(client, message, args) => {
      
      let sunucular = db.fetch("izinli_sunucular");
      if(!sunucular.includes(interaction.guild.id)) return interaction.reply({content: "Bu Sunucuda kullanım izni bulunmamaktadır."})

      const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('‼️​ Yeni Deprem ‼️​')
      .setAuthor({ name: 'Deprem Bilgi', iconURL: 'https://i.hizliresim.com/dtilsrh.png', url: 'http://www.koeri.boun.edu.tr/scripts/lst7.asp' })
      .addFields(
        { name: 'Deprem Adresi', value: 'TATLAR-NURHAK (KAHRAMANMARAS)' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Tarih Saat', value: '2023.02.08 10:30:05', inline: true },
        { name: 'Büyüklük', value: '3.5', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Derinlik', value: '6.5 km', inline: true },
        { name: 'Enlem/Boylam', value: '39.1583 / 40.1548', inline: true },
      )
      .setTimestamp()
      .setFooter({ text: 'Deprem Bilgi', iconURL: 'https://i.hizliresim.com/dtilsrh.png' });
    
    message.channel.send({ embeds: [exampleEmbed] });

},

name: "yardım",
description: "",
aliases: [],
kategori: "",
usage: "",
}