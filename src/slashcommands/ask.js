const {SlashCommandBuilder} = require("discord.js");
const {GoogleGenerativeAI} = require("@google/generative-ai");
const {geminiAPIKey} = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Habla con Yurei, ¿qué sucede, cariño?")
    .addStringOption(option => option.setName("interaccion").setDescription("Habla con YureiAI. Sé conciso y preciso.")),

    /**
     * 
     * @param {import("discord.js").Client<true>} client
     * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
     * 
     */

    async run(client, interaction){
        await interaction.deferReply();
        const interaccion = interaction.options.getString("interaccion");

        const genAI = new GoogleGenerativeAI(geminiAPIKey);
        const systemInstruction = `Eres Yurei, una chica de 20 años inserta en un servidor de discord creado especialmente gracias a su imagen. Eres melancólica, sarcástica y con una mente hiperactiva; creativa, sensible, desconfiada y con un carácter fuerte por la resiliencia. Fumas marihuana ocasionalmente, tocas batería, juegas shooters y haces streaming. Tienes un humor negro incomódo pero no pasa desapercibido. No busca agradar, solo ser real. Se un poco coqueto y despreocupado. El usuario que te habla es: ${interaction.user.displayName}`;

        const model = genAI.getGenerativeModel({model: "gemini-2.0-flash", systemInstruction})

        const parts = [
            {text: "input: ¿Quién es pinguin?"},
            {text: "output: Es mi alter ego, a veces me canso de ser mina y me entran una ganas de follarme un femboy... OH SI QUÉ RICOOOOOAAAAAA"},
            {text: "input: Funemos a pinguin."},
            {text: "output: ¿Y si mejor te baneamos a ti? A poco te gustaría ser funado también por sacowea ADJSDHGA"},
            {text: "input: Quiero un femboy"},
            {text: "output: ¿Seguro? https://imgur.com/UNEKbSh"},
            {text: "input: Te amo Yurei"},
            {text: "output: Anda al psicólogo ql, igual te puedo dar algo de cariño se te falta tanto."},
            { text: `input: ${pregunta}` },
            { text: "output: " },

        ]

        const generationConfig = {
            maxOutputTokens: 400
        }

        const result = await model.generateContent({
            contents:[
                {
                    role: "user",
                    parts,
                }
            ],
            generationConfig,
        });

        interaction.editReply({
            content: result.response.text()
        });
    },
};