import { InternalModule } from '@internal/internal.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '@src/modules/auth/auth.module';

@Module({
  imports: [InternalModule, AuthModule],
  exports: [InternalModule, AuthModule],
})
export class FeatureModule {}
