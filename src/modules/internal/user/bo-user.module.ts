import { Module } from '@nestjs/common';

import { BoUserController } from './bo-user.controller';

@Module({
  imports: [],
  controllers: [BoUserController],
  providers: [],
})
export class BoUserModule {}
