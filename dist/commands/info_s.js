import { EmbedBuilder } from "discord.js";
export default {
    name: 'info',
    async execute(interaction) {
        if (!interaction.guild)
            return;
        const ping = Math.round(interaction.client.ws.ping);
        const server = await interaction.client.guilds.fetch();
        const client = await interaction.guild.members.fetch(interaction.client.user);
        const result = new EmbedBuilder()
            .setAuthor({ name: client.nickname || interaction.client.user.displayName, iconURL: client.displayAvatarURL() })
            .setColor('DarkAqua')
            .setTitle('Коротко о моем состояний')
            .addFields({ name: 'Задержка', value: `${ping} ms` }, { name: 'Количество серверов', value: `\`${server.size}\` серверов` });
        await interaction.reply({ embeds: [result] }).catch((err) => console.error(err));
    }
};
