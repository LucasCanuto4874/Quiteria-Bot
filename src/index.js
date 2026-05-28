import { client } from "../app.js";
import { Calculadora } from "./calculadora/calculadora.js";
import { gerarGif } from "./gif_dogs/gif-dogs.js";
import { GifEmbed } from "./embeds/gif-embed.js";
import {
  LAURA_BUTTON_FILES,
  buildLauraUpdate,
  buildLauraPrompt,
} from "./laura/laura-components.js";
import { gerarNumeroAleatorio } from "./random_number/random-number.js";
client.on("messageCreate", (message) => {
  // Verifica se a mensagem não é do próprio bot
  if (message.author.bot) return;

  // Envia uma mensagem ao detectar "oi"
  if (message.content.toLowerCase() === "oi") {
    message.channel.send(`olá ${message.author.username}!`);
  }
});


client.on("interactionCreate", async (interaction) => {

  if (interaction.isButton()) {
    switch (interaction.customId) {
      case "yes_laura_doacao": {
        await interaction.update(
          buildLauraUpdate({
            title: "Obrigado por doar para a Laura!",
            imagePath: LAURA_BUTTON_FILES.yes,
            description: "Imagem de agradecimento",
          })
        );
        return;
      }
      case "no_laura_doacao": {
        await interaction.update(
          buildLauraUpdate({
            title: "Tudo bem, talvez depois!",
            imagePath: LAURA_BUTTON_FILES.no,
            description: "Imagem alternativa",
          })
        );
        return;
      }
      default: {
        return;
      }
    }
  }
  
  if (!interaction.isCommand()) {
    return;
  }

  switch (interaction.commandName) {
    case "somar": {
      var resultado = Calculadora(
        interaction.options.getNumber("n1"),
        interaction.options.getNumber("n2"),
        "somar"
      );
      interaction.reply(`${resultado}`);
      break;
    }
    case "multiplicar": {
      var resultado = Calculadora(
        interaction.options.getNumber("n1"),
        interaction.options.getNumber("n2"),
        "multiplicar"
      );
      interaction.reply(`${resultado}`);
      break;
    }
    case "slack": {
      interaction.reply("Olá Slack");
      break;
    }
    case "dog": {
      const { gifUrl, texto } = gerarGif();
      const embeds = new GifEmbed({
        color: 0x00ff00,
        title: texto,
        gifUrl: gifUrl,
      }).toJSON();
      interaction.reply({ embeds: [embeds] });
      break;
    }
    case "adivinhar": {
      var numeroUsuario = interaction.options.getInteger("num");
      var randomNumber = gerarNumeroAleatorio(1, 10);

      if (numeroUsuario != randomNumber) {
        const gif = gerarGif();
        const embeds = new GifEmbed({
          color: 0x00ff00,
          title: "Você não acertou porquinteria!!",
          gifUrl: gif.gifUrl,
        }).toJSON();
        interaction.reply({ embeds: [embeds] });
      } else {
        const gif = gerarGif();
        const embeds = new GifEmbed({
          color: parseInt("A18262", 16),
          title: "Você acertou a porquinteria!!",
          gifUrl: gif.gifUrl,
        }).toJSON();
        interaction.reply({ embeds: [embeds] });
      }
      break;
    }
    case "laura": {
      interaction.reply(buildLauraPrompt());
    }
  }
})
