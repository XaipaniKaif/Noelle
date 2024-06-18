import fs from 'fs';
const slashCommands = {};
const contexCommands = {};
const autocomplateCommands = {};
fs.readdirSync('./dist/commands').forEach(async (file) => {
    if (file.endsWith('_s.js')) {
        const command = (await import(`../commands/${file}`)).default;
        const commandName = command.name;
        slashCommands[commandName] = command;
    }
});
fs.readdirSync('./dist/commands').forEach(async (file) => {
    if (file.endsWith('_c.js')) {
        const command = (await import(`../commands/${file}`)).default;
        const commandName = command.name;
        contexCommands[commandName] = command;
    }
});
fs.readdirSync('./dist/commands').forEach(async (file) => {
    if (file.endsWith('a_s.js')) {
        const command = (await import(`../commands/${file}`)).default;
        const commandName = command.name;
        autocomplateCommands[commandName] = command;
    }
});
export default {
    async slashHandler(interaction) {
        const { commandName } = interaction;
        try {
            if (slashCommands[commandName]) {
                await slashCommands[commandName].execute(interaction);
            }
        }
        catch (error) {
            console.error(error);
        }
    },
    async contextHandler(interaction) {
        const { commandName } = interaction;
        try {
            if (contexCommands[commandName]) {
                await contexCommands[commandName].execute(interaction);
            }
        }
        catch (error) {
            console.error(error);
        }
    },
    async autocomplate(autocomplate) {
        const { commandName } = autocomplate;
        try {
            if (autocomplateCommands[commandName]) {
                await autocomplateCommands[commandName].autocomplate(autocomplate);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
