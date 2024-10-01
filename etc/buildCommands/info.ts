import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";


export default {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Моя информация!')
    .setContexts([InteractionContextType.BotDM])
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .setNameLocalization('ru', 'инфо')


}