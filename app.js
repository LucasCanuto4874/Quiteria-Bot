import{ Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { commands } from "./comandos.js";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const rest = new REST({ version: "10" }).setToken(TOKEN);

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(TOKEN);

client.once("ready", async () => {
  console.log(`Bot está online como ${client.user.tag}!`);

  try {
    console.log("Registrando comandos localmente...");
    console.log(`🔧 CLIENT_ID: ${CLIENT_ID}`);
    console.log(`🔧 GUILD_ID: ${GUILD_ID}`);

    // Registro de comandos no servidor específico
    const resultado = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log(`Comandos registrados com sucesso!`);
  } catch (error) {
    console.error("Erro ao registrar comandos:", error.message);
  }
});