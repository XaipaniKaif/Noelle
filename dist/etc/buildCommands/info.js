import { SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Моя информация!')
        .setDMPermission(false)
        .setNameLocalizations({ ru: 'инфо' })
};
