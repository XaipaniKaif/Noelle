import { ComponentType } from "discord.js";
import settings_components from "../etc/components/settings_components.js";
import { welcomSetting } from "../etc/components/config_bots/welcomUser.js";
export default {
    name: 'settings',
    async execute(interaction) {
        const message = await interaction.reply({ embeds: [settings_components.listConfigBot().embed], components: [settings_components.listConfigBot().components], ephemeral: true });
        const collector = message.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60_000 });
        collector.on('collect', async (i) => {
            const value = i.values[0];
            switch (value) {
                case ('welcom'): {
                    await welcomSetting(i);
                }
            }
        });
        collector.on('end', async (collect, reason) => {
            if (reason === 'time') {
                await message.delete().catch(() => { });
            }
        });
    }
};
