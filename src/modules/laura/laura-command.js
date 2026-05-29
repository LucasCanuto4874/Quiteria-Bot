import {
  LAURA_BUTTON_FILES,
  buildLauraUpdate,
  buildLauraPrompt,
} from "./laura-components.js";

export function comandoLaura(interaction) {
  if (!interaction.isCommand()) return;

  return interaction.reply(buildLauraPrompt());
}

export async function handleLauraButton(interaction) {
  if (!interaction.isButton()) return false;

  const updateData = getLauraButtonUpdate(interaction.customId);

  if (!updateData) {
    return false;
  }

  await interaction.update(updateData);
  return true;
}

function getLauraButtonUpdate(customId) {
  switch (customId) {
    case "yes_laura_doacao": {
      return buildLauraUpdate({
        title: "Obrigado por doar para a Laura!",
        imagePath: LAURA_BUTTON_FILES.yes,
        description: "Imagem de agradecimento",
      });
    }
    case "no_laura_doacao": {
      return buildLauraUpdate({
        title: "Tudo bem, talvez depois!",
        imagePath: LAURA_BUTTON_FILES.no,
        description: "Imagem alternativa",
      });
    }
    default: {
      return null;
    }
  }
}
