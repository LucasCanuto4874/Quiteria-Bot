import path from "node:path";

const LAURA_BUTTON_FILES = {
  yes: "src/img/good_end.jpg",
  no: "src/img/bad_ending.png",
};

const LAURA_PROMPT_FILE = "src/img/Laura_doacao.jpeg";

function buildLauraUpdate({ title, imagePath, description }) {
  const fileName = path.basename(imagePath);
  return {
    flags: 1 << 15,
    files: [
      {
        attachment: imagePath,
        name: fileName,
      },
    ],
    components: [
      {
        type: 10,
        content: title,
      },
      {
        type: 12,
        items: [
          {
            media: { url: `attachment://${fileName}` },
            description,
          },
        ],
      },
    ],
  };
}

function buildLauraPrompt() {
  const fileName = path.basename(LAURA_PROMPT_FILE);
  return {
    flags: 1 << 15,
    files: [
      {
        attachment: LAURA_PROMPT_FILE,
        name: fileName,
      },
    ],
    components: [
      {
        type: 10,
        content: "Laura merece doação?",
      },
      {
        type: 12,
        items: [
          {
            media: { url: `attachment://${fileName}` },
            description: "Essa é a Laura",
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            custom_id: "yes_laura_doacao",
            label: "Doar para a Laura",
            style: 1,
          },
          {
            type: 2,
            custom_id: "no_laura_doacao",
            label: "Não doar para a Laura",
            style: 4,
          },
        ],
      },
    ],
  };
}

export { LAURA_BUTTON_FILES, buildLauraUpdate, buildLauraPrompt };
