import { BoAuthorizeModule } from '@internal/authorize/bo-authorize.module';
import { BoUserModule } from '@internal/user/bo-user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BoUserModule, BoAuthorizeModule],
  providers: [],
  controllers: [],
  exports: [BoUserModule, BoAuthorizeModule],
})
export class InternalModule {}
