import commandsHandler from "../handlers/commandsHandler.js";
export async function commandsInteraction(interaction) {
    if (interaction.isChatInputCommand()) {
        await commandsHandler.slashHandler(interaction);
    }
    if (interaction.isContextMenuCommand()) {
        await commandsHandler.contextHandler(interaction);
    }
}
