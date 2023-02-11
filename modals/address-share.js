const { EmbedBuilder } = require("discord.js");

module.exports = {
    id: "adresPaylasim",
    run: async (client, interaction, config, db) => {

        return  interaction.send(
            { 
                content: 'Adres Paylaşım talebiniz alınmıştır yetkililerimiz en kısa sürede doğruluğunu kontrol edecektir', 
                ephemeral: true 
            });
    },
};
