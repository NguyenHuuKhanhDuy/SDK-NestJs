import { Module } from '@nestjs/common';

import { queryHandlers } from './queries';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...queryHandlers],
  exports: [],
})
export class UserModule {}
