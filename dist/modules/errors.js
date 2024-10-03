export async function errorsDebug(interaction, error) {
    const codeError = error.code;
    const codeStack = error.stack;
    const guildId = interaction.guild?.id;
    console.log(`Код ошибки: ${codeError}\nСтек ошибки: ${codeStack}\nСервер: ${guildId}`);
}
