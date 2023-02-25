const { Events } = require("discord.js");
const { execute } = require("./message");

module.exports = {
  name: Events.ClientReady,
  async execute(client) {
    client.user.setStatus("online");
    const aktiviteler = [
      "Deprem Bilgi Paylaşım Botu",
      "Lütfen sahte bilgi girişi yapmayınız."

    ]
    setInterval(function () {
      var random = Math.floor(Math.random() * (aktiviteler.length - 0 + 1) + 0);

      client.user.setActivity(aktiviteler[random], "");
    }, 2 * 2500);

    console.log("Ayarlamalar: Durum Ayarlandı!")
    console.log("Ayarlamalar: Aktivite Ayarlandı!\n")

    const memberCount = client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)

    console.log("Bot İstatistiği")
    console.log(`Sunucu Sayısı: ${client.guilds.cache.size}`)
    console.log(`Kullanıcı Sayısı: ${memberCount}`)
    console.log(`Kanal Sayısı: ${client.channels.cache.size}\n`)

    console.log(`${client.user.tag} olarak Discord'a giriş yaptım. Artık kullanılmaya hazırım`);
  }

}
