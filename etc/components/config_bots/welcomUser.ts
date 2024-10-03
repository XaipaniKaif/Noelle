import { ComponentType, StringSelectMenuInteraction } from "discord.js";
import welcom from '../settingsComponents/welcom.js'



export async function welcomSetting(i: StringSelectMenuInteraction) {
    const reply = await i.reply({embeds: [welcom.startWelcom().embed], components: [welcom.startWelcom().components], ephemeral: true})

    const collector = reply.createMessageComponentCollector({componentType: ComponentType.StringSelect, time: 60_000})
    
    collector.on('collect', async (i) => {
        const option = i.values[0]

        switch(option) {
            case('quickSetup') : {
                await quickSetup(i)
            }
        }
    })

}


async function quickSetup(i: StringSelectMenuInteraction) {
    
}