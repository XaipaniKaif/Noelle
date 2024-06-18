import { ComponentType } from "discord.js";
import axios from "axios";
import steam_components from "../etc/components/steam_components.js";
export default {
    name: 'steam',
    async execute(interaction) {
        const requestName = interaction.options.getString('name', true);
        const language = interaction.options.getString('language');
        const currency = interaction.options.getString('currency');
        const searchURL = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(requestName)}&l=${encodeURIComponent(language || 'russian')}&cc=${currency || 'us'}`;
        await interaction.deferReply();
        const resultSearch = await axios({ url: searchURL })
            .then((response) => response.data)
            .catch(async (err) => { console.error(err); return await interaction.editReply('В данный момент сервис недоступен, попробуйте позже'); });
        if (resultSearch.items.length <= 0) {
            return await interaction.editReply('По вашему запросу ничего не найдено');
        }
        const listGames = resultSearch.items.map((item) => {
            return {
                label: item.name,
                value: item.id.toString()
            };
        });
        const listOfGames = await steam_components.listOfGames(listGames, interaction);
        const reply = await interaction.editReply({ embeds: [listOfGames.embed], components: [listOfGames.components] });
        const collector = reply.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 120000 });
        collector.on('collect', async (i) => {
            const id = i.values[0];
            await i.deferReply();
            let infoGames;
            const gameDetailsUrl = `https://store.steampowered.com/api/appdetails?appids=${id}&l=${language || 'russian'}&cc=${currency || 'us'}`;
            const resultGameDetails = async (url) => {
                const response = await axios({ url: url })
                    .then((response) => { return response.data; })
                    .catch(async (err) => { console.error(err); return await i.editReply(`Извините, произошла непридивиденная ошибка, попробуйте позже`); });
                const data = response[id].data || response[id];
                return data;
            };
            console.log(await resultGameDetails(gameDetailsUrl));
            if ((await resultGameDetails(gameDetailsUrl)).success === false) {
                const gameDetailsRepetUrl = `https://store.steampowered.com/api/appdetails?appids=${id}&l=${language || 'russian'}&cc=us`;
                infoGames = steam_components.infoGames(await resultGameDetails(gameDetailsRepetUrl), false);
            }
            else {
                infoGames = steam_components.infoGames(await resultGameDetails(gameDetailsUrl));
            }
            await i.editReply({ embeds: [infoGames] });
        });
    }
};
