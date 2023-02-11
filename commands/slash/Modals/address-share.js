const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "adres-paylasim",
    description: "Adres Paylaşımı",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
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
        
          await interaction.showModal(modal);
    },
};
