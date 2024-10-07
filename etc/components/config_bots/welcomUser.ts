import { ChannelType, ComponentType, InteractionResponse, Message, PermissionsBitField, StringSelectMenuInteraction, TextChannel } from "discord.js";
import welcom from '../settingsComponents/welcom.js'
import { MySQL } from '../../../modules/database.js'


export async function welcomSetting(interaction: StringSelectMenuInteraction) {
    await interaction.deferReply({ephemeral: true})
    const reply = await interaction.editReply({embeds: [welcom.startWelcom().embed], components: [welcom.startWelcom().components]})
 
    const collector = reply.createMessageComponentCollector({componentType: ComponentType.StringSelect, time: 20_000})
    
    collector.on('collect', async (i) => {
        const value = i.values[0]
        if (value === 'quickSetup') {
            await quickSetup(i)
            collector.stop()
        }
    })
    collector.on('end', async () => {
        await reply.delete().catch(() => {})
    })

}


async function quickSetup(i: StringSelectMenuInteraction) {
    if (!i.guild) return;
    const channelQuickSetting = await i.guild.channels.create({
        name: 'Быстрая настройка',
        type: ChannelType.GuildText,
        permissionOverwrites: [
            {id: i.guild.id, deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]},
            {id: i.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]}
        ]
    });
    await i.reply({content: `Перейдите в <#${channelQuickSetting?.id}> для дальнейшей настройки`, ephemeral: true})
    await createWelcomMessage(null, channelQuickSetting, true)
}


async function createWelcomMessage(interaction: StringSelectMenuInteraction | null, channel?: TextChannel, quickSetup?:boolean ) {
    const guideMessage = await channel?.send({embeds: [welcom.createMessageWelcomTutorial()]})

    const filter = (m: Message) => !m.author.bot && m.attachments.size === 0 && m.stickers.size === 0 && m.content.length <= 4000 
    const collector = channel?.createMessageCollector({max: 1, time: 360_000, filter: filter})
    
    collector?.on('collect', async (m) => {
        const content = m.content;
        const sql = `INSERT INTO ?? (id_guild, welcom_message) VALUES (?, ?) ON DUPLIСATE KEY UPDATE welcom_message = VALUES(welcom_message)`;
        (await MySQL()).query(sql, ['welcom_guilds', m.guild?.id, content])
    })

    collector?.on('end', async (collected, reason) => {
        if (reason === 'time') {
            await channel?.send('Долго так то, попробуйте позже. Канал удалится автоматически')
            setTimeout(async () => await channel?.delete(), 20_000)
        } else if (reason === 'limit') {
            if (quickSetup === true) {
                const logMessage = await channel?.send('Сохраняю данные, ожидайте...')
                await guideMessage?.delete()
                setTimeout(async () => {await selectChannelWelcom(null, channel, quickSetup); await logMessage?.delete()}, 5_000)
            } else {
                await channel?.send('Приветственное сообщение успешно сохранено!')
                setTimeout(async () => await channel?.delete(), 10_000)
            }
            
        }
    })
}

async function selectChannelWelcom(interaction: StringSelectMenuInteraction | null, channel?: TextChannel, quickSetup?: boolean) {
    let messageReply: Message | InteractionResponse | undefined
    if (quickSetup === true) {
        messageReply = await channel?.send({embeds: [welcom.selectChannelWelcomTutorial().embed], components: [welcom.selectChannelWelcomTutorial().components]})
    } else {
        messageReply = await interaction?.reply({embeds: [welcom.selectChannelWelcomTutorial().embed], components: [welcom.selectChannelWelcomTutorial().components], ephemeral: true, fetchReply: true})
    }

    const collector = messageReply?.createMessageComponentCollector({time: 120_000, componentType: ComponentType.ChannelSelect})
    
    collector?.on('collect', async (c) => {
        const channelId = c.id
        const sql = `UPDATE ?? SET id_welcom_channel = ? WHERE id_guild = ?`;
        (await MySQL()).query(sql, ['welcom_guilds', channelId, c.guild?.id])
        collector.stop('ok')
    })

    collector?.on('end', async (collected, reason) => {
        if (reason === 'time') {
            if (interaction) {
                await interaction.editReply({content: 'Слишком долго, попробуйте позже'})

            } else {
                await channel?.send('Слишком долго, попробуйте позже')
                await channel?.delete().catch(() => {})
            }
            
        } else if (reason === 'ok') {
            if (quickSetup === true) {
                const logMessage = await channel?.send('Сохраняю данные, ожидайте...')
                await messageReply?.delete().catch(() => {})
            } else {
                if (interaction) {
                    await interaction.editReply('Канал успешно сохранен')
                } else {
                    await channel?.send('Канал успешно сохранен!')
                    await channel?.delete().catch(() => {})
                }
            }
        }
    })
}