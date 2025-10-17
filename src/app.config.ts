import * as process from 'node:process';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const APP_CONFIG = {
  // Application configuration
  NODE_ENV: process.env.NODE_ENV,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  CLIENT_SECRET_KEY: process.env.CLIENT_SECRET_KEY,
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,

  // Database configuration
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,

  //JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  // Redis configuration
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASS: process.env.REDIS_PASS,

  // SendGrid
  SEND_GRID_KEY: process.env.SEND_GRID_KEY,
  SEND_GRID_EMAIL: process.env.SEND_GRID_EMAIL,
  SEND_GRID_NAME: process.env.SEND_GRID_NAME,
};
