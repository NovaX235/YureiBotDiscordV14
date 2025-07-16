const fs = require("fs");
const {REST, Routes} = require("discord.js");
const config = require("../../config.json");
const commands = [];
const slashCommandsFiles = fs.readdirSync("./src/slashcommands").filter(file => file.endsWith("js"));

for(const file of slashCommandsFiles){
    const slash = require(`../slashcommands/${file}`)
    commands.push(slash.data.toJSON())
}

const rest = new REST({version: "10"}).setToken(config.token);

createSlash()

async function createSlash(){
    try{
        await rest.put(
            Routes.applicationCommands(config.botId), {
                body: commands
            }
        )
        console.log("Slash commands agregados.")
    }catch(e){
        console.error(e)
    }
}
