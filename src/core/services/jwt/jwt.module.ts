import { EnvKey } from '@common/constant';
import { RedisModule } from '@core/services/redis';
import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigEnvironmentService } from '@src/configs/config-environment.base.service';

import { JwtTokenService } from './jwt.service';

@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
      inject: [],
      useFactory: () => ({
        secret: ConfigEnvironmentService.getIns().get(EnvKey.Jwt.Secret),
        signOptions: {
          expiresIn:
            ConfigEnvironmentService.getIns().get(EnvKey.Jwt.Expires) || '1h',
        },
      }),
    }),
    RedisModule,
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
