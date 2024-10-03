import { ApplicationIntegrationType, ContextMenuCommandBuilder, InteractionContextType} from "discord.js";


export default {
    data: new ContextMenuCommandBuilder()
    .setName('avatar')
    .setNameLocalization('ru', 'аватар')
    .setContexts([InteractionContextType.Guild, InteractionContextType.PrivateChannel])
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setType(2)
}