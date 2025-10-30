import { UserModule } from '@internal/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  providers: [],
  controllers: [],
})
export class InternalModule {}
