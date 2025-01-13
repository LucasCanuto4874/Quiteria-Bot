const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const TOKEN = 'Coloque seu token';
const CLIENT_ID = 'coloque o client id'
const GUILD_ID = 'coloque o guild id'

// Lista de comandos
const commands = [
    {
        name: 'somar',
        description: 'Comando para somar dois números',
        options: [{
            type: 10,
            name: 'n1',
            description: 'Digite o primeiro número',
            required: true
        },
        {
            type: 10,
            name: 'n2',
            description: 'Digite o segundo número',
            required: true
        }
        ],
    },
    {
        name: 'multiplicar',
        description: 'Comando para somar multiplicar dois números',
        options: [{
            type: 10,
            name: 'n1',
            description: 'Digite o primeiro número',
            required: true
        },
        {
            type: 10,
            name: 'n2',
            description: 'Digite o segundo número',
            required: true
        }
        ],
    },
    {
        name: 'slack',
        description: 'Olá Slack!'
    },
    {
        name: 'dog',
        description: 'Cachorro aleatório estilo quitéria...'
    }
];

//Enviar comandos para o discord
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Registrando comandos localmente...');

        // Registro de comandos globais
        await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands });

        console.log('Comandos locais registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos locais:', error);
    }
})();


//Criando conexão para o bot interprestar as mensagens
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
    console.log(`Bot está online como ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    // Verifica se a mensagem não é do próprio bot
    if (message.author.bot) return;

    // Envia uma mensagem ao detectar "oi"
    if (message.content.toLowerCase() === 'oi') {
        message.channel.send(`olá ${message.author.username}!`);
        console.log(message.author.username)
    }
});

//Parte de interações 
client.on('interactionCreate', async (interaction) => {

    // verificando se a interação é a partir de um comando
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'somar') {
        var n1 = interaction.options.getNumber('n1')
        var n2 = interaction.options.getNumber('n2')
        var resultado = n1 + n2

        console.log(`números que o usuario digitou foram ${n1} e ${n2}`)
        interaction.reply(`${resultado}`)
    }
    else if (interaction.commandName === 'multiplicar') {
        var n1 = interaction.options.getNumber('n1')
        var n2 = interaction.options.getNumber('n2')
        var resultado = n1 * n2

        console.log(`números que o usuario digitou foram ${n1} e ${n2}`)
        interaction.reply(`${resultado}`)
    }
    else if(interaction.commandName === 'slack'){
        interaction.reply('Olá Slack')
    } else if (interaction.commandName === 'dog') {
        interaction.reply('https://tenor.com/pt-BR/view/dog-bald-dog-lmao-meme-black-noob-gif-12233867927035438360');
    }
})

// Login do bot
client.login(TOKEN);
