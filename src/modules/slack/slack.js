export function comandoSlack(interaction) {
  if (!interaction.isCommand()) return;

  return interaction.reply("Olá Slack");
}
