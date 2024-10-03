import { ApplicationIntegrationType, InteractionContextType, PermissionsBitField, SlashCommandBuilder, } from "discord.js";



export default {
    data: new SlashCommandBuilder()
    .setName('settings')
    .setNameLocalization('ru', 'настройки')
    .setDescription('Конфигурация бота на сервере')
    .setContexts([InteractionContextType.Guild])
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
}