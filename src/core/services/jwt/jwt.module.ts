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
        secret: ConfigEnvironmentService.getIns().get('JWT_SECRET'),
        signOptions: {
          expiresIn:
            ConfigEnvironmentService.getIns().get('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
