import { ActionRowBuilder, EmbedBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } from "discord.js";
export default {
    startWelcom() {
        const embed = new EmbedBuilder()
            .setTitle('Настройка моего приветствия на сервере')
            .setColor('Random');
        const components = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
            .setCustomId('startWelcom')
            .setPlaceholder('Выберите настройку')
            .addOptions(new StringSelectMenuOptionBuilder()
            .setLabel('Быстрая настройка')
            .setValue('QuickSetup')));
        return { embed, components };
    }
};
