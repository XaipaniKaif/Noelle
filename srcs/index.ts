import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';
import { registrCommands } from './registrCommands.js';
import { commandsInteraction } from '../etc/imports.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
    ],
    partials: [
        Partials.GuildMember,
        Partials.User
    ]
});

client.once('ready', async () => {
    console.log(`${client.user?.displayName} в сети!`)
    await registrCommands()
})
client.on(Events.InteractionCreate, async (interaction) => {
    await commandsInteraction(interaction)
})
client.login(process.env.TOKEN);
