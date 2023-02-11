const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
    config: {
        name: "deprem",
        description: "Deprem bilgilerini gösterir",
      },
      permissions: ['SendMessages'],
        run: async (client, message, args, prefix, config, db) => {
            axios.get("https://deprem.afad.gov.tr/last-earthquakes.html")
                .then(response => {
                  const html = response.data;
                  const $ = cheerio.load(html);
                
                  const earthquakes = [];
                
                  $('table tbody tr').each((i, element) => {
                    if(i > 5) return false;

                    const date = $(element).find('td:nth-child(1)').text();
                    const depth = $(element).find('td:nth-child(4)').text();
                    const magnitude = $(element).find('td:nth-child(6)').text();
                    const province = $(element).find('td:nth-child(7)').text();

                    earthquakes.push({
                      date,
                      depth,
                      magnitude,
                      province
                    });
                  });
              
                    const embed = new EmbedBuilder()
                        .setColor('Blue')
                        .setTitle('Son 5 Deprem Bilgileri');
                         
                    for (const earthquake of earthquakes) {
                        embed.addFields(
                            { name: 'Tarih', value: earthquake.date || "no data" },
                            { name: 'Derinlik (km)', value: earthquake.depth || "no data", inline: true  },
                            { name: 'Büyüklük (Richter)', value: earthquake.magnitude || "no data", inline: true  },
                            { name: 'Yer', value: earthquake.province || "no data", inline: true  }
                        );
                    }
                    message.channel.send({ embeds: [embed] });
                })
                .catch(error => {
                  console.log(error);
                });
        }

}