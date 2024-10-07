import { ActionRowBuilder, EmbedBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType } from "discord.js"



export default {
    startWelcom() {
        const embed = new EmbedBuilder()
        .setTitle('Настройка моего приветствия на сервере')
        .setColor('Random')
        const components = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('startWelcom')
            .setPlaceholder('Выберите настройку')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel('Быстрая настройка')
                .setValue('quickSetup')
            )
        )
        return {embed, components}
    },
    createMessageWelcomTutorial() {
        const embed = new EmbedBuilder()
        .setTitle('Создание приветственного сообщения')
        .setColor('Blue')
        .setDescription(
            `Отправьте текст вашего приветственного сообщения для того, чтобы я могла его отправлять новым пользователям\n\n
            Учтите некоторые правила для его создания:\n
            \*Не отправляйте картинку, я ее не прийму\*\n
            \*Не отравляйте стикеры\*
            `
        )
        return embed
    },
    selectChannelWelcomTutorial() {
        const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('Выбор канала для приветствия пользователя')
        .setDescription(`Выберите канал, в котором я буду приветствовать нового пользователя сервера`)
        const components = new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
            new ChannelSelectMenuBuilder()
            .setCustomId('selectWelcomChannel')
            .setChannelTypes([ChannelType.GuildText, ChannelType.GuildAnnouncement])
            .setPlaceholder('Выберите канал')
        )
        return {embed, components}
    }
}
