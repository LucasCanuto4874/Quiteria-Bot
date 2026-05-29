import { gerarGif } from "../gif_dogs/gif-dogs.js";
import { GifEmbed } from "../../embeds/gif-embed.js";

export function comandoDog(interaction) {
  if (!interaction.isCommand()) return;

  const { gifUrl, texto } = gerarGif();
  const embeds = buildDogEmbeds(gifUrl, texto);

  return interaction.reply({ embeds });
}

function buildDogEmbeds(gifUrl, texto) {
  const embed = new GifEmbed({
    color: 0x00ff00,
    title: texto,
    gifUrl,
  }).toJSON();

  return [embed];
}
