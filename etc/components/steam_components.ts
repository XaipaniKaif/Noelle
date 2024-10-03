import { ActionRowBuilder, ChatInputCommandInteraction, ClientUser, EmbedBuilder, GuildMember, StringSelectMenuBuilder } from "discord.js";
import {htmlToText} from 'html-to-text'

export default {
    async listOfGames(list: any[], interaction: ChatInputCommandInteraction) {
        if (interaction.guild) {
            const client = await interaction.guild.members.fetch(interaction.client.user).catch((err) => {console.error(err); return interaction.client.user});
            const embed = new EmbedBuilder()
            .setAuthor({name: (client as GuildMember).nickname || client.displayName, iconURL: (client as ClientUser).displayAvatarURL()})
            .setTitle('Результат поиска')
            .setColor('Green')
            .setDescription(`По вашему запросу было найдено: \`${list.length}\` продуктов`)
            const components = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('listOfGames')
                .setPlaceholder('Выберите продукт')
                .addOptions(list)
            )
            
            return {embed, components}
        } else {
            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.displayName, iconURL: interaction.client.user.displayAvatarURL()})
            .setTitle('Результат поиска')
            .setColor('Green')
            .setDescription(`По вашему запросу было найдено: \`${list.length}\` продуктов`)
            const components = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('listOfGames')
                .setPlaceholder('Выберите продукт')
                .addOptions(list)
            )
            return {embed, components}
        }
       
    },
    infoGames(result: any, success?: boolean) {

        function formatHtmlToText(text: string) {
            return htmlToText(text, {
                wordwrap: 130, // Устанавливаем ширину строки
                preserveNewlines: true // Сохраняем переносы строк
              });
        }
        const description = formatHtmlToText(result.about_the_game);

        let embed = new EmbedBuilder()
        .setAuthor({name: `Разработчики: ${result.developers.join(', ')}`})
        .setTitle(result.name)
        .setColor('Random')
        .setDescription(description)
        .addFields(
            {name: 'Metacritic', value: result.metacritic?.score?.toString() || 'N/A'},
            {name: 'Дата выхода', value: result.release_date.date || 'N/A'},
            {name: 'Издатель', value: result.publishers[0] || 'N/A'},
            {name: 'Цена', value: result.price_overview?.final_formatted || 'N/A'}
        )
        .setImage(result.header_image)
        if (success === false) {
            embed.setFooter({text: 'В указанной ценовой зоне игра скорее всего недоступна. Цена указана в "USD"'})
        }
        if (result.type === 'dlc') {
            embed.addFields({name: 'Тип товара', value: 'DLC'})
        }
        return embed

    }
}