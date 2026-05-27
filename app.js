import { commands } from "./comandos.js";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
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
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Bot está online como ${client.user.tag}!`);
});

// Login do bot
client.login(TOKEN);