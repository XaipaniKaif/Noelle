import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { commandsInteraction } from '../etc/imports.js';
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences
    ]
});
client.once('ready', async () => {
    console.log(`${client.user?.displayName} в сети!`);
    //await registrCommands()
});
client.on(Events.InteractionCreate, async (interaction) => {
    await commandsInteraction(interaction);
});
client.login(process.env.TOKEN);
