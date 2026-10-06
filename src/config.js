'use strict';

const fs = require('node:fs');
const path = require('node:path');

module.exports = function loadConfig() {
  const configPath = path.resolve(__dirname, '..', 'config.json');

  if (!fs.existsSync(configPath)) {
    const template = JSON.stringify({ token: 'YOUR_TOKEN_HERE' }, null, 2);

    fs.writeFileSync(configPath, `${template}\n`, { flag: 'wx' });
    throw new Error('Created config.json. Add your token and restart the application.');
  }

  let config;

  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    throw new Error('Cannot read config.json or its JSON format is invalid.');
  }

  if (
    !config
    || typeof config.token !== 'string'
    || !config.token.trim()
    || config.token.trim() === 'YOUR_TOKEN_HERE'
  ) {
    throw new Error('Add your token to the token field in config.json.');
  }

  return { token: config.token.trim() };
};
