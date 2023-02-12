const {  ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder} = require('discord.js');
const Buttons = require('../../util/Buttons');
const Modals = require('../../util/Modals');

const buttonHandler = async (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId === Buttons.HowToShare)
        return await howToShareAdressButtonHandler(interaction)
    else if (interaction.customId === Buttons.ShareAddress) {
        return await shareAddressButtonHandler(interaction)
    }
}
const howToShareAdressButtonHandler = async (interaction) => {
    const menu = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription(`
  "Mesajınızı yazarken, ihtiyacı olan insanların neye ihtiyacı olduğu ve lokasyon olarak nerede bulunduğunu detaylı bir şekilde yazmanız çok önemli. Lütfen 'Hatay' diyip bırakmayınız. Olabildiğince açıklayınız. Lütfen bilgilerini teyit etmeye çalışınız, bilginin doğruluğu en önemli şey bizim için"
`)
    interaction.reply({ embeds: [menu], ephemeral: true })
}
const shareAddressButtonHandler = async (interaction) => {
    const modal = new ModalBuilder()
        .setCustomId(Modals.ShareAddressModal)
        .setTitle('Deprem Adres Paylaş');

    const adresbilgi = new TextInputBuilder()
        .setCustomId('deprem-adresi')
        .setLabel('Adres Bilgisi')
        .setPlaceholder('06420 Çankaya/Ankara')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(15)
        .setMaxLength(400)
        .setRequired(true);

    const modal_1 = new ActionRowBuilder().addComponents(adresbilgi);
    modal.addComponents(modal_1);

    interaction.showModal(modal);
}
module.exports = {
    buttonHandler,
    Buttons
};
