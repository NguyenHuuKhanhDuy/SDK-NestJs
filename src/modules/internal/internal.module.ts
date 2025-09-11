import { BoAuthorizeModule } from '@internal/authorize/bo-authorize.module';
import { BoUserModule } from '@internal/user/bo-user.module';
import { Module } from '@nestjs/common';

import { BoMenuModule } from './menu/bo-menu.module';

@Module({
  imports: [BoUserModule, BoAuthorizeModule, BoMenuModule],
  providers: [],
  controllers: [],
  exports: [BoUserModule, BoAuthorizeModule],
})
export class InternalModule {}
