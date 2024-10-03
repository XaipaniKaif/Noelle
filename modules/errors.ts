import { ContextMenuCommandInteraction, Interaction } from "discord.js";



export async function errorsDebug(interaction: Interaction | ContextMenuCommandInteraction, error: any) {
    const codeError:number = error.code
    const codeStack = error.stack
    const guildId = interaction.guild?.id


    console.log(`Код ошибки: ${codeError}\nСтек ошибки: ${codeStack}\nСервер: ${guildId}`)
}