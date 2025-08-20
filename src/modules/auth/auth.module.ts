import { JwtTokenModule } from '@core/services/jwt';
import { Module } from '@nestjs/common';
import { commandHandlers } from '@src/modules/auth/commands';

import { AuthController } from './auth.controller';

@Module({
  imports: [JwtTokenModule],
  providers: [...commandHandlers],
  controllers: [AuthController],
})
export class AuthModule {}
