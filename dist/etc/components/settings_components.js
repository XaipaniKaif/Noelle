import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
export default {
    listConfigBot() {
        const embed = new EmbedBuilder()
            .setTitle('Мои настройки')
            .setColor("#00BFFF")
            .setDescription('Здесь вы можете настроить мой функционал под свое усмотрение.')
            .addFields({ name: 'Приветствие', value: 'Настройте меня так, чтобы я смогла привествовать новых участников сервера' });
        const components = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
            .setCustomId('listConfigBot')
            .setPlaceholder('Выберите настройку')
            .addOptions(new StringSelectMenuOptionBuilder()
            .setLabel('Приветствие')
            .setValue('welcom')));
        return { embed, components };
    }
};
