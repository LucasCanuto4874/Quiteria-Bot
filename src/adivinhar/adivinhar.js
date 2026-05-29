import { gerarGif } from "../gif_dogs/gif-dogs.js";
import { GifEmbed } from "../embeds/gif-embed.js";
import { gerarNumeroAleatorio } from "../random_number/random-number.js";

export function comandoAdivinhar(interaction) {
  if (!interaction.isCommand()) return;

  const numeroUsuario = interaction.options.getInteger("num");
  const randomNumber = gerarNumeroAleatorio(1, 10);
  const embed = buildAdivinharEmbed(numeroUsuario, randomNumber);

  return interaction.reply({ embeds: [embed] });
}

function buildAdivinharEmbed(numeroUsuario, randomNumber) {
  const acertou = numeroUsuario === randomNumber;
  const { gifUrl } = gerarGif();

  return new GifEmbed({
    color: acertou ? parseInt("A18262", 16) : 0x00ff00,
    title: acertou
      ? "Você acertou a porquinteria!!"
      : "Você não acertou porquinteria!!",
    gifUrl,
  }).toJSON();
}
