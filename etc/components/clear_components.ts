import { ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";



function resultDeleteMessage(result:number, reason: string | null, user: User | null) {
    let embed = new EmbedBuilder()
    .setColor('Green')
    .setTitle('Отчет об удалений')
    .setThumbnail(`https://i.pinimg.com/originals/51/8c/fc/518cfc9e3de40195948e2a1f1108a0fe.gif`)
    .setDescription(`Было удалено \`${result}\` сообщений`)
    //.addFields({name: 'Удалил', value: `<@${i.user.id}>`})
    if (user) {
        embed.addFields({name: 'Удалены пользователя', value: `<@${user.id}>`})
    }
    if (reason) {
        embed.addFields({name: 'По причине', value: reason})
    }
    return embed;
}
function deleteState() {
    const embed = new EmbedBuilder()
    .setTitle('Удаление')
    .setColor('Red')
    .setDescription(`Удаление... `)
    return embed
}

export {resultDeleteMessage, deleteState}