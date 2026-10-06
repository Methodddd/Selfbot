'use strict';

const loadConfig = require('./config');
const startPresence = require('./presence');

async function main() {
  const config = loadConfig();
  const { Client, RichPresence } = require('discord.js-selfbot-v13');
  const client = new Client();

  let stopPresence = () => {};

  client.once('ready', () => {
    console.log(`Logged in as ${client.user.username}`);
    stopPresence = startPresence(client, RichPresence);
  });

  client.on('error', () => {
    console.error('A Discord connection error occurred.');
  });

  const shutdown = () => {
    stopPresence();
    client.destroy();
    process.exit(0);
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);

  try {
    await client.login(config.token);
  } catch {
    stopPresence();
    client.destroy();
    throw new Error('Login failed. Check your token and network connection.');
  }
}

main().catch((error) => {
  const message = error.code === 'MODULE_NOT_FOUND'
    ? 'Install dependencies: npm install'
    : error.message;

  console.error(message);
  process.exitCode = 1;
});
