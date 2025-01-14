const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");

const TOKEN = 'Coloque seu token';
const CLIENT_ID =  'coloque o client id'
const GUILD_ID = 'coloque o guild id'

// Lista de comandos
const commands = [
  {
    name: "somar",
    description: "Comando para somar dois números",
    options: [
      {
        type: 10,
        name: "n1",
        description: "Digite o primeiro número",
        required: true,
      },
      {
        type: 10,
        name: "n2",
        description: "Digite o segundo número",
        required: true,
      },
    ],
  },
  {
    name: "multiplicar",
    description: "Comando para somar multiplicar dois números",
    options: [
      {
        type: 10,
        name: "n1",
        description: "Digite o primeiro número",
        required: true,
      },
      {
        type: 10,
        name: "n2",
        description: "Digite o segundo número",
        required: true,
      },
    ],
  },
  {
    name: "slack",
    description: "Olá Slack!",
  },
  {
    name: "dog",
    description: "Cachorro aleatório estilo quitéria...",
  },
];

//Enviar comandos para o discord
const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registrando comandos localmente...");

    // Registro de comandos globais
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Comandos locais registrados com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar comandos locais:", error);
  }
})();

//Criando conexão para o bot interprestar as mensagens
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Bot está online como ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  // Verifica se a mensagem não é do próprio bot
  if (message.author.bot) return;

  // Envia uma mensagem ao detectar "oi"
  if (message.content.toLowerCase() === "oi") {
    message.channel.send(`olá ${message.author.username}!`);
    console.log(message.author.username);
  }
});

//Parte de interações
client.on("interactionCreate", async (interaction) => {
  // verificando se a interação é a partir de um comando
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "somar") {
    var n1 = interaction.options.getNumber("n1");
    var n2 = interaction.options.getNumber("n2");
    var resultado = n1 + n2;

    console.log(`números que o usuario digitou foram ${n1} e ${n2}`);
    interaction.reply(`${resultado}`);
  } else if (interaction.commandName === "multiplicar") {
    var n1 = interaction.options.getNumber("n1");
    var n2 = interaction.options.getNumber("n2");
    var resultado = n1 * n2;

    console.log(`números que o usuario digitou foram ${n1} e ${n2}`);
    interaction.reply(`${resultado}`);
  } else if (interaction.commandName === "slack") {
    interaction.reply("Olá Slack");
  } else if (interaction.commandName === "dog") {
    const {gifUrl, texto} = gerarGif();
    console.log(gifUrl)
    console.log(texto);
    const embeds = {
      color: parseInt('A18262', 16),
      title: texto,
      image: { url: gifUrl },
    };
    interaction.reply({ embeds: [embeds] });
  }
});
// Lista de Gifs
const gif = [
  "https://media.tenor.com/LmXWDEt07L0AAAAM/cachorro-batendo-panela-n-peita.gif",
  "https://media1.tenor.com/m/qcduD9P95RgAAAAd/dog-bald-dog.gif",
  "https://media1.tenor.com/m/f911hugXZHAAAAAd/scrunchy-dog-awkward-smile.gif",
  "https://media1.tenor.com/m/wp52_ax4waUAAAAd/dachshund-dog.gif",
  "https://media1.tenor.com/m/y1_R-Cyg6noAAAAd/cachorro-no%C3%B4nibus.gif",
  "https://media1.tenor.com/m/2zdlJaB19iAAAAAd/cute-dog.gif",
  "https://media1.tenor.com/m/yOleO_qKGccAAAAd/puppy-dog.gif",
  "https://media1.tenor.com/m/PREDV1I6I4gAAAAd/dog-feral.gif",
  "https://media1.tenor.com/m/jm-992BT-4IAAAAd/dog-dog-backwards.gif",
  "https://media1.tenor.com/m/4Q40PZIgfMUAAAAd/k%C3%B6pek-dog.gif",
  "https://media1.tenor.com/m/s0pElLSXstsAAAAd/kreggy-dog.gif",
  "https://media1.tenor.com/m/wCHolCJgSBwAAAAd/dog-dog-funny.gif",
  "https://media1.tenor.com/m/pmH1WP4iSvwAAAAd/dog-jump.gif",
];

function gerarGif() {
  const indexGif = Math.floor(Math.random() * (gif.length - 1));
  console.log(indexGif);
  var texto = "";
  switch (indexGif) {
    case 0:
      texto = "Cachorro fazendo panelaço";
      break;
    case 1:
      texto = "Cachorro careca da Quica";
      break;
    case 2:
      texto = "Dog com o sorriso Quica";
      break;
    case 3:
      texto = "Dog chapado com o briquedo";
      break;
    case 4:
      texto = "Cachorro pegando ônibus bem Quica";
      break;
    case 5:
      texto = "Chupetorro bem Quiquinha";
      break;
    case 6:
      texto = "Cachorro implorando por comida para Quica";
      break;
    case 7:
      texto = "Cachorro cafeinado da Quica";
      break;
    case 8:
      texto = "Flip Dog";
      break;
    case 9:
      texto = "Cachorro levando água para Quica";
      break;
    case 10:
      texto = "Cachorro esfomeado comendo a comida do Culega";
      break;
    case 11:
      texto = "Dog com a máscara da Quitéria";
      break;
    case 12:
      texto = "Cachorros da Quitéria pulando corda";
      break;
  }
  const gifUrl = gif[indexGif];
  return { gifUrl, texto };
}

// Login do bot
client.login(TOKEN);
