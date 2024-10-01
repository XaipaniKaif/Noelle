import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";


export default {
    data: new SlashCommandBuilder()
    .setName('steam')
    .setDescription('Поиск игр по базе данных Steam')
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel])
    .addStringOption(option =>
        option.setName('name')
            .setNameLocalizations({ru: 'название'})
            .setDescription('Введите название игры')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('language')
            .setNameLocalizations({ru: 'язык'})
            .setDescription('Язык запроса')
            .addChoices(
                {name: 'Русский', value: 'russian'},
                {name: 'English', value: 'english'}
            )
    )
    .addStringOption(option =>
        option.setName('currency')
        .setNameLocalizations({ru: 'валюта'})
        .setDescription('Выберите ценовую валюту')
        .addChoices(
            {name: 'USD', value: 'us'},
            {name: 'RUB', value: 'ru'},
            {name: 'KZT', value: 'kz'},
            {name: 'TRY', value: 'tr'}
        )
    )
}