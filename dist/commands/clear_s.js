import { TextChannel, NewsChannel, ForumChannel, ThreadChannel } from "discord.js";
import { resultDeleteMessage, deleteState } from "../etc/components/clear_components.js";
export default {
    name: 'clear',
    async execute(interaction) {
        if (!interaction.guild)
            return;
        const count = interaction.options.getInteger('count');
        const time = interaction.options.getInteger('time');
        const reason = interaction.options.getString('reason');
        const user = interaction.options.getUser('user');
        if (!count && !time) {
            return await interaction.reply({ content: 'Для удаления сообщений необходим один из параметров: \`количество\` или \`время\`', ephemeral: true });
        }
        const timeRangeMessage = time && time * 60_000;
        await interaction.deferReply();
        let messageCollection;
        if (user) {
            messageCollection = await interaction.channel?.messages.fetch({ limit: 100 });
        }
        else {
            messageCollection = await interaction.channel?.messages.fetch({ limit: count && (count + 1) || 100 });
        }
        const resultMessage = await interaction.editReply({ embeds: [deleteState()] });
        const messageCollectionDelete = messageCollection?.filter((message) => message.id !== resultMessage.id);
        if (messageCollectionDelete?.size === 0) {
            return await interaction.editReply('Нет сообщений для удаления');
        }
        const channelTypes = (channel) => {
            return channel instanceof TextChannel || channel instanceof NewsChannel || channel instanceof ForumChannel || channel instanceof ThreadChannel;
        };
        if (interaction.channel && channelTypes(interaction.channel) && messageCollectionDelete) {
            let filterMessage = null;
            if (timeRangeMessage && user && count) {
                filterMessage = messageCollectionDelete.filter((message) => (Date.now() - message.createdTimestamp) <= timeRangeMessage && message.author.id === user.id).first(count);
            }
            ;
            if (timeRangeMessage && user && !count) {
                filterMessage = messageCollectionDelete.filter((message) => (Date.now() - message.createdTimestamp) <= timeRangeMessage && message.author.id === user.id);
            }
            ;
            if (user && count && !timeRangeMessage) {
                filterMessage = messageCollectionDelete.filter((message) => message.author.id === user.id).first(count);
            }
            if (timeRangeMessage && !user && !count) {
                filterMessage = messageCollectionDelete.filter((message) => (Date.now() - message.createdTimestamp) <= timeRangeMessage);
            }
            if (!user && !timeRangeMessage)
                filterMessage = messageCollectionDelete;
            const result = await interaction.channel?.bulkDelete(filterMessage);
            await interaction.editReply({ embeds: [(resultDeleteMessage(result.size, reason, user))] });
        }
    }
};
