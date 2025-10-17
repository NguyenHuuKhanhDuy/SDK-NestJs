export const EnvKey = {
  App: {
    Port: 'APP_PORT',
    CorsAllowedOrigins: 'CORS_ALLOWED_ORIGINS',
    NodeEnv: 'NODE_ENV',
  },
  Database: {
    Host: 'DB_HOST',
    Port: 'DB_PORT',
    User: 'DB_USER',
    Password: 'DB_PASS',
    Name: 'DB_NAME',
    DebugLoggingTypeOrm: 'DEBUG_LOGGING_TYPEORM',
  },
  Redis: {
    Host: 'REDIS_HOST',
    Port: 'REDIS_PORT',
    Password: 'REDIS_PASS',
  },
  Jwt: {
    Secret: 'JWT_SECRET',
    Expires: 'JWT_EXPIRES_IN',
  },
  SendGrid: {
    ApiKey: 'SEND_GRID_KEY',
    Email: 'SEND_GRID_EMAIL',
    Name: 'SEND_GRID_NAME',
  },
};
