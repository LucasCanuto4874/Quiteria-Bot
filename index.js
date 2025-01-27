const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const {
  Player,
  useMainPlayer,
  useQueue,
  useTimeline,
  QueueRepeatMode,
} = require("discord-player");
const { YoutubeiExtractor } = require("discord-player-youtubei");
const { SpotifyExtractor } = require("@discord-player/extractor");
const { fetch, setGlobalDispatcher, Agent } = require("undici");

setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }));

const client = new Client({
  restTimeOffset: 0,
  shards: "auto",
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  retryLimit: 3,
  timeout: 20000,
});
const player = new Player(client, {
  leaveOnEnd: true,
  leaveOnEndCooldown: 10000,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 5000,
  altoSelfDeaf: true,
  initialVolume: 50,
  bufferingTimeout: 10000,
  skipFFmpeg: false,
  connectionTimeout: 10000,
});

const TOKEN =
  "";
const CLIENT_ID = "";
const GUILD_ID = "";
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
  {
    name: "adivinhar",
    description: "tente adivinhar um número de 1 a 10 que o bot escolheu",
    options: [
      {
        type: 4,
        name: "num",
        description: "Digite o seu chute",
        required: true,
      },
    ],
  },
  {
    name: "tocar",
    description: "Tocar uma música no canal de voz",
    options: [
      {
        type: 3, // Tipo 3 corresponde a STRING
        name: "música",
        description: "Digite o nome ou link da música",
        required: true,
      },
    ],
  },
  {
    name: "pausar",
    description: "Pausar ou despausar a música atual",
  },
  {
    name: "fila",
    description: "Mostra a fila atual!",
  },
  {
    name: "skip",
    description: "Pula a música atual!",
  },
  {
    name: "loop",
    description: "Modo de loop",
    options: [
      {
        type: 10,
        name: "modo",
        description: "Defina o modo de loop para as músicas",
        choices: [
          {
            name: "Single",
            value: QueueRepeatMode.TRACK,
          },
          {
            name:"All",
            value:QueueRepeatMode.QUEUE
          },
          {
            name:"Off",
            value:QueueRepeatMode.OFF
          }
        ],
      },
    ],
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

player.extractors.register(SpotifyExtractor, {});
player.extractors.register(YoutubeiExtractor, {});

client.once("ready", () => {
  console.log(`Bot está online como ${client.user.tag}!`);
  client.user.setActivity("Your Soung", { type: "LISTENING" });
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

player.events.on('error', (queue, error) => {
  console.error(`Erro no player na guilda ${queue.guild.name}:`, error.message);
  queue.metadata.channel.send('⚠️ Ocorreu um erro no player. Tente novamente!');
});

player.events.on('playerError', (queue, error) => {
  console.error(`Erro durante a reprodução na guilda ${queue.guild.name}:`, error.message);
  queue.metadata.channel.send('⚠️ Houve um problema durante a reprodução da música.');
});

//Parte de interações
client.on("interactionCreate", async (interaction) => {
  // verificando se a interação é a partir de um comando
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "tocar") {
    try {
      await interaction.deferReply(); // Marca como processando

      const canal = interaction.member.voice.channel;
      if (!canal) {
        return await interaction.editReply(
          "Você precisa entrar em um canal de voz, Quica!"
        );
      }

      const musica = interaction.options.getString("música");
      if (!musica) {
        return await interaction.editReply(
          "Digite o nome ou um link de uma música, Quica!"
        );
      }

      const player = useMainPlayer(); // Certifique-se de que o player está inicializado
      const queue = player.nodes.create(interaction.guild.id, {
        metadata: {
          channel: interaction.channel,
        },
        selfDeaf: true,
      });

      if (!queue.connection) {
        await queue.connect(canal);
        console.log("Bot conectado ao canal de voz");
      }

      const track = await player.search(musica, {
        requestedBy: interaction.user,
      });

      if (!track || !track.tracks.length) {
        return await interaction.editReply(
          "Nenhuma música encontrada, irmã Quica!"
        );
      }

      queue.addTrack(track.tracks[0]);

      if (!queue.isPlaying()) {
        await queue.node.play();
        console.log("Música tocando agora...");
        return await interaction.editReply(
          `**Tocando agora:** ${track.tracks[0].title}`
        );
      } else {
        return await interaction.editReply(
          `**Música adicionada à playlist:** ${track.tracks[0].title}`
        );
      }
    } catch (error) {
      console.error("Erro ao tentar conectar ou tocar a música:", error);
      const queue = player.nodes.create(interaction.guild.id, {
        metadata: {
          channel: interaction.channel,
        },
      });
      if (queue) queue.delete(); // Remove a fila para evitar problemas futuros
      return await interaction.Reply(
        "Não foi possível se conectar ao canal."
      );
    }
  }
  if (interaction.commandName == "pausar") {
    const timeline = useTimeline({
      node: interaction.guild,
    });
    if (!timeline) {
      return interaction.reply(
        "Este servidor não tem uma sessão de player ativa, Culega!"
      );
    }

    const wasPaused = timeline.paused;
    wasPaused ? timeline.resume() : timeline.pause();
    return interaction.reply(
      `A música está: ${wasPaused ? "Despausada" : "Pausada"}.`
    );
  }

  if (interaction.commandName === "fila") {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply("Não existem músicas na fila");
    const musicaAtual = queue.currentTrack;
    const proximaMusica = queue.tracks.toArray().slice(0, 5);

    const mensagem = [
      `**Agora está tocando:** ${musicaAtual.title} - ${musicaAtual.author}`,
      ``,
      `**Proximas músicas:**`,
      proximaMusica.map(
        (track, index) => `**${index + 1}.** ${track.title} - ${track.author}`
      ),
    ].join("\n");

    return interaction.reply(mensagem);
  }

  if (interaction.commandName === "skip") {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return interaction.reply(
        "Este servidor não tem uma sessão de player ativa, Culega!"
      );
    if (!queue.isPlaying())
      return interaction.reply("Não tem nenhuma música tocando, culega!");

    interaction.reply(`Skipando a música ${queue.currentTrack.title}`);
    queue.node.skip();

    return;
  }

  if (interaction.commandName === "loop") {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return interaction.reply(
        "Este servidor não tem uma sessão de player ativa, Culega!"
      );
    const loopMode = interaction.options.getNumber('modo');

    console.log(loopMode)
   
    let modo
    
    if(loopMode === 0)
      modo = "Modo loop desativado."
    
    else if(loopMode === 1)
      modo = "Modo loop nessa música"
    else if(loopMode === 2)
      modo = "Modo loop na fila inteira"

    queue.setRepeatMode(loopMode)

    return interaction.reply(modo)
  }

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
  } else if (interaction.commandName === "multiplicar") {
    var n1 = interaction.options.getNumber("n1");
    var n2 = interaction.options.getNumber("n2");
    var resultado = n1 * n2;

    console.log(`números que o usuario digitou foram ${n1} e ${n2}`);
    interaction.reply(`${resultado}`);
  } else if (interaction.commandName === "slack") {
    interaction.reply("Olá Slack");
  } else if (interaction.commandName === "dog") {
    const { gifUrl, texto } = gerarGif();
    const embeds = {
      color: 0x00ff00,
      title: texto,
      image: { url: gifUrl },
    };
    interaction.reply({ embeds: [embeds] });
  } else if (interaction.commandName === "adivinhar") {
    var numeroUsuario = interaction.options.getInteger("num");
    var randomNumber = Math.floor(Math.random() * 10) + 1;

    if (numeroUsuario != randomNumber) {
      console.log("numero aleatorio", randomNumber);
      const gif = gerarGif();
      const embeds = {
        color: 0x00ff00,
        title: "Você não acertou porquinteria!!",
        image: { url: gif },
      };
      interaction.reply({ embeds: [embeds] });
    } else {
      console.log("numero aleatorio", randomNumber);
      const gif = gerarGif();
      const embeds = {
        color: parseInt("A18262", 16),
        title: "Você acertou a porquinteria!!",
        image: { url: gif },
      };
      interaction.reply({ embeds: [embeds] });
    }
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
  "https://cdn.discordapp.com/attachments/1328111900340256808/1328819229553856605/image.png?ex=678816d8&is=6786c558&hm=d528bdb9179d703a1fd0a7ad502e5c2c3d0cc9e4d5362f3132647a348ad26f4e&",
];

function gerarGif() {
  const indexGif = Math.floor(Math.random() * gif.length);
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
    case 13:
      texto = "Cachorro da Quica fazendo código bunda!";
  }
  const gifUrl = gif[indexGif];
  return { gifUrl, texto };
}

module.exports = { player, client };

// Login do bot
client.login(TOKEN);
