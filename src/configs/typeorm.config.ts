import * as Entities from '@infrastructure/entities';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ConfigEnvironmentService } from './config-environment.base.service';

const allEntities = [...Object.values(Entities)].filter(
  (entity) =>
    typeof entity === 'function' &&
    entity.prototype &&
    entity.prototype.constructor === entity,
);
export const TypeOrmConfig = {
  type: 'postgres',
  host: ConfigEnvironmentService.getIns().get('DB_HOST'),
  port: Number(ConfigEnvironmentService.getIns().get('DB_PORT')),
  username: ConfigEnvironmentService.getIns().get('DB_USER'),
  password: ConfigEnvironmentService.getIns().get('DB_PASS'),
  database: ConfigEnvironmentService.getIns().get('DB_NAME'),
  entities: allEntities,
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
  migrationsRun: false,
  synchronize: false,
  logging:
    ConfigEnvironmentService.getIns().get('DEBUG_LOGGING_TYPEORM') === 'true',
  extra: { charset: 'utf8mb4' },
} as TypeOrmModuleOptions;

export default registerAs('typeorm', () => TypeOrmConfig);
export const connectionSource = new DataSource(
  TypeOrmConfig as DataSourceOptions,
);
