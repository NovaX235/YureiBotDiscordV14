const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Comprueba la latencia del bot."),

    /**
     * 
     * @param {import("discord.js").client<"true">} client
     * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
     */

    async run(client, interaction){
        interaction.reply(`**¡Pong!** Mi latencia es de: **${client.ws.ping} ms**`)
    }
}