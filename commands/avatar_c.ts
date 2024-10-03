import { ChatInputCommandInteraction, EmbedBuilder, UserContextMenuCommandInteraction } from "discord.js";




export default {
    name: 'avatar',
    async execute(interaction: UserContextMenuCommandInteraction) {
        await interaction.deferReply()
        const user = interaction.targetUser
      
        const guildUser = await interaction.guild?.members.fetch(user)
       
        const embed = new EmbedBuilder()
        .setAuthor({name: `${interaction.user.displayName}`, iconURL: interaction.user.displayAvatarURL()})
        .setColor('Random')
        .setTitle(`Аватар \`${guildUser?.nickname || user.displayName}\``)
        .setImage(guildUser?.displayAvatarURL({size: 2048}) || user.displayAvatarURL({size: 2048}))

        await interaction.editReply({embeds: [embed]})
    }
}