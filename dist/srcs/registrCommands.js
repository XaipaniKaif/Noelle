import fs from "fs";
import { REST, Routes } from "discord.js";
let commands = [];
export async function registrCommands() {
    const files = fs.readdirSync('./dist/etc/buildCommands');
    for (let file of files) {
        if (file.endsWith('.js')) {
            const command = (await import(`../etc/buildCommands/${file}`)).default;
            if ('data' in command) {
                commands.push(command.data.toJSON());
            }
            else {
                console.log('error');
            }
        }
    }
    if (!process.env.TOKEN)
        process.exit(1);
    if (!process.env.CLIENTID)
        process.exit(1);
    const rest = new REST().setToken(process.env.TOKEN);
    console.log(`Запуск! Количество команд: ${commands.length}`);
    await rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
        .then((result) => { console.log(`Успешно! Команд зарегистрировано: ${result.length}`); })
        .catch((err) => { console.error(err); });
}
