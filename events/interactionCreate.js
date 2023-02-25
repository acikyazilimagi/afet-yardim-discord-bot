const { Events } = require("discord.js");
const { buttonHandler } = require("../handlers/interactionHandlers/buttonHandlers");
const { modalSubmitHandler } = require("../handlers/interactionHandlers/modalHandlers");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            await buttonHandler(interaction);
            await modalSubmitHandler(interaction);
        } catch (error) {
            console.error(error);
        }



    }

};
