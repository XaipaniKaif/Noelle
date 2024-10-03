import welcom from '../settingsComponents/welcom.js';
export async function welcomSetting(i) {
    await i.reply({ embeds: [welcom.startWelcom().embed], components: [welcom.startWelcom().components], ephemeral: true });
}
