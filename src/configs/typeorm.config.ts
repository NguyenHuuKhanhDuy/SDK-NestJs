import { EnvKey } from '@common/constant';
import * as Entities from '@infrastructure/entities';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigEnvironmentService } from './config-environment.base.service';

const allEntities = [...Object.values(Entities)].filter(
  (entity) =>
    typeof entity === 'function' &&
    entity.prototype &&
    entity.prototype.constructor === entity,
);
export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: ConfigEnvironmentService.getIns().get(EnvKey.Database.Host),
  port: Number(ConfigEnvironmentService.getIns().get(EnvKey.Database.Port)),
  username: ConfigEnvironmentService.getIns().get(EnvKey.Database.User),
  password: ConfigEnvironmentService.getIns().get(EnvKey.Database.Password),
  database: ConfigEnvironmentService.getIns().get(EnvKey.Database.Name),
  entities: allEntities,
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: false,
  synchronize: false,
  logging:
    ConfigEnvironmentService.getIns().get(
      EnvKey.Database.DebugLoggingTypeOrm,
    ) === 'true',
};

export default registerAs('typeorm', () => TypeOrmConfig);
