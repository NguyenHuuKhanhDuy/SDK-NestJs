import { InternalModule } from '@internal/internal.module';
import { Module } from '@nestjs/common';

import { AuthModule, CountryModule, HealthModule, UserModule } from '.';

@Module({
  imports: [
    InternalModule,
    AuthModule,
    HealthModule,
    CountryModule,
    UserModule,
  ],
  exports: [
    InternalModule,
    AuthModule,
    HealthModule,
    CountryModule,
    UserModule,
  ],
})
export class FeatureModule {}
