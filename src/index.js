const { Client, GatewayIntentBits, Partials, GuildTemplate, Collection } = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessagePolls,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildExpressions,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessagePolls,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],

    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.SoundboardSound,
        Partials.ThreadMember,
        Partials.User,
    ]

});

client.slashCommands = new Collection();
const slashCommandsFiles = fs
    .readdirSync("./src/slashcommands")
    .filter((file) => file.endsWith(".js"));
for (const file of slashCommandsFiles){
    const slash = require(`./slashcommands/${file}`);
    client.slashCommands.set(slash.data.name, slash)
}

client.on("interactionCreate", async (interaction) => {
    if(interaction.isChatInputCommand()){
        const slashCommand = client.slashCommands.get(interaction.commandName);

        if(!slashCommand) return;
        
        try{
            await slashCommand.run(client, interaction);
        }catch(e){
            console.error(e);
        }
    }
});

client.on("message", (message) => {
    let prefix = "y!"

    if (!message.content.startsWith(prefix)) return;

    let usuario = message.mentions.members.first() || message.member;
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const comand = args.shift().toLowerCase();
})


client.on("ready", () => {
    console.log(`Listo como ${ client.user.tag }`);
});

client.login(config.token);