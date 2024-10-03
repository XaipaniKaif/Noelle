import commandsHandler from "../handlers/commandsHandler.js";
export default {
    async commandsInteraction(interaction) {
        if (interaction.isChatInputCommand()) {
            await commandsHandler.slashHandler(interaction);
        }
        if (interaction.isContextMenuCommand()) {
            await commandsHandler.contextHandler(interaction);
        }
        if (interaction.isAutocomplete()) {
            await commandsHandler.autocomplate(interaction);
        }
    },
    async stringSelectInteraction(interaction) {
    }
};
