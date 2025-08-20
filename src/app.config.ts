import * as process from 'node:process';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const APP_CONFIG = {
  APP_PORT: process.env.APP_PORT,

  // Database configuration
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
};
