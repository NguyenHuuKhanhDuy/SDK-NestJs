import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '@src/modules/auth/auth.module';
import { InternalModule } from '@src/modules/internal/internal.module';

@Module({
  imports: [InternalModule, AuthModule, UserModule],
  exports: [InternalModule, AuthModule, UserModule],
})
export class FeatureModule {}
