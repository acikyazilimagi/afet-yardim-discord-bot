require("dotenv").config();
const fs = require('fs')
const util = require('util')
const readdir = util.promisify(fs.readdir)

const express = require('express');
const app = express();
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages], partials: [Partials.Channel] });
const ascii = require("ascii-table");

let table = new ascii("commands");
table.setHeading("Dosya", "Kullanım", "Diğer Kullanımlar", "Yükleme durumu");
// DİSCORD BOT

client.commands = new Collection();
client.events = new Collection();

const setup = async () => {
  //Load events
  const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'))
  for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    console.log(`Loading Event - ${event.name}`)
    client.on(event.name, (...args) => event.execute(...args))
  }

  //Load commands
  const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('name' in command && 'start' in command) {
      client.commands.set(command.name, command);
      table.addRow(file, command.name, `Hazır.`);
    } else {
      table.addRow(file, command.name, `Hata -> ${file} komut dosyasına 'name' veya 'start' alanları eklenmemiş.`); 
    }
  }
  console.log(table.toString()); 

  client.login(process.env.TOKEN);
}
// HEALTHCHECK
setup();

app.use("/healthcheck", require('express-healthcheck')({
  healthy: () => {
    return { status: "healthy" }
  }
}));


app.listen(3000);
