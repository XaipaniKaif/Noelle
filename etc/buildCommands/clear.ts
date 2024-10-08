import { SlashCommandBuilder, PermissionsBitField, InteractionContextType, ApplicationIntegrationType } from "discord.js"



export default {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Очистка сообщений в чате')
    .setContexts([InteractionContextType.Guild])
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
    .setNameLocalization('ru', 'очистка')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
    .addIntegerOption(option =>
        option.setName('count')
        .setNameLocalization('ru', 'количество')
        .setMinValue(1)
        .setMaxValue(100)
        .setDescription('Укажите количество сообщений (максимум 100)')
    )
    .addUserOption(option =>
        option.setName('user')
        .setNameLocalization('ru', 'пользователь')
        .setDescription('Укажите пользователя')
    )
    .addIntegerOption(option =>
        option.setName('time')
        .setNameLocalization('ru', 'время')
        .setDescription('Укажите время')
    )
    .addStringOption(option =>
        option.setName('reason')
        .setNameLocalization('ru', 'причина')
        .setDescription('Укажите причину')
    )
}