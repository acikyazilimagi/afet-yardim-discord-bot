const { Discord, EmbedBuilder } = require("discord.js");
const db = require("nrc.db");
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async (client, message, args) => {

        

        let member = message.guild.members.cache.get(message.author.id);
        
        if(!member.roles.cache.has(ayarlar.sunucu_ekleme_yetkili_rol)) return message.reply({ content: 'Yetkili rolüne sahip değilsiniz' });
        
        const veri = args[0];

        if (!veri) return message.reply({ content: 'Sunucu id si belirtiniz' });

        let kontrol = client.guilds.cache.get(veri);

        if (!kontrol) return message.reply({ content: 'Sunucu bulunamadı veya sunucuya ekli değilim.' });

        db.push("izinli_sunucular", veri);
        message.reply({ content: 'Başarılı bir şekilde **'+veri+'** idsine sahip sunucuya komut kullanım izni verildi' });


    },

    name: "sunucu-izin",
    description: "",
    aliases: [],
    kategori: "",
    usage: "",
}