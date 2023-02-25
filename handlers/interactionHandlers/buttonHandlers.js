const {  ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder} = require('discord.js');
const Buttons = require('../../util/Buttons');
const Constants = require('../../util/Constants');
const Modals = require('../../util/Modals');
const TextInputs = require('../../util/TextInputs');

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
        .setDescription(Constants.HOW_TO_SHARE_ADDRESS)
    interaction.reply({ embeds: [menu], ephemeral: true })
}
const shareAddressButtonHandler = async (interaction) => {
    const modal = new ModalBuilder()
        .setCustomId(Modals.ShareAddressModal)
        .setTitle('Deprem Adres Paylaş');

    const addressInfo = new TextInputBuilder()
        .setCustomId(TextInputs.EarthquakeAddress)
        .setLabel('Adres Bilgisi')
        .setPlaceholder('Acilen bebek maması ihtiyacı var, General Şükrü Kanadli Mahallesi....')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(15)
        .setMaxLength(400)
        .setRequired(true);
    const googleMapsInput = new TextInputBuilder()
        .setCustomId(TextInputs.GoogleMapsLocationUrl)
        .setLabel('google maps link (lütfen araştırıp bulun)')
        .setPlaceholder('https://goo.gl/maps/3jA1dDLsH9Kq3LEt6 (eğer elinizde yoksa opsiyonel)')
        .setStyle(TextInputStyle.Short)
        .setMinLength(30)
        .setMaxLength(40)
        .setRequired(false);
    const addressInfoInputRow = new ActionRowBuilder().addComponents(addressInfo);
    const googleMapsInputRow = new ActionRowBuilder().addComponents(googleMapsInput);
    modal.addComponents(addressInfoInputRow, googleMapsInputRow);

    interaction.showModal(modal);
}
module.exports = {
    buttonHandler
};
