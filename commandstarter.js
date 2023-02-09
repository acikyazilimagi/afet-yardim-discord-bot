const { readdirSync } = require("fs"); 
const ascii = require("ascii-table");

let table = new ascii("commands");
table.setHeading("Dosya", "Kullanım", "Diğer Kullanımlar", "Yükleme durumu");

module.exports = (client) => {
        const commands = readdirSync(`./commands/`).filter(file => file.endsWith(".js")); 
        for (let file of commands) { 
            let pull = require(`./commands/${file}`); 
            if (pull.name) { 
                client.commands.set(pull.name, pull); 
                table.addRow(file, pull.name, pull.aliases, 'Hazır');
            } else {
                table.addRow(file, pull.name, pull.aliases, `Hata -> Komut klasöründe isim yazılmamış.`); 
                continue; 
            }
            if (pull.name && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name)); 
        }
    console.log(table.toString()); 

}
