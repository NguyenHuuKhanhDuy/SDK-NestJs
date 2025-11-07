import { EnvKey } from '@common/constant';
import * as Entities from '@infrastructure/entities';
import { ConfigEnvironmentService } from '@src/configs/config-environment.base.service';
import { DataSource } from 'typeorm';

const allEntities = [...Object.values(Entities)].filter(
  (entity) =>
    typeof entity === 'function' &&
    entity.prototype &&
    entity.prototype.constructor === entity,
);

export const connectionSource = new DataSource({
  type: 'postgres',
  host: ConfigEnvironmentService.getIns().get(EnvKey.Database.Host),
  port: Number(ConfigEnvironmentService.getIns().get(EnvKey.Database.Port)),
  username: ConfigEnvironmentService.getIns().get(EnvKey.Database.User),
  password: ConfigEnvironmentService.getIns().get(EnvKey.Database.Password),
  database: ConfigEnvironmentService.getIns().get(EnvKey.Database.Name),
  entities: allEntities,
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
});
