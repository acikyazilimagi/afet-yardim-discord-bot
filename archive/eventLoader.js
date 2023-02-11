module.exports = client => {
    client.on("messageCreate", require("../events/message"));

    require("./ready")(client);

};