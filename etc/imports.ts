import { Interaction } from "discord.js";
import commandsHandler from "../handlers/commandsHandler.js";


export async function commandsInteraction(interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
        await commandsHandler.slashHandler(interaction)
    }
}