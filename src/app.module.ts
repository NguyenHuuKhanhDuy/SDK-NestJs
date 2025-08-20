// app.module.ts
import { CoreModule } from '@core/core.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { FeatureModule } from '@src/modules/feature.module';

@Module({
  imports: [
    // Global config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CqrsModule.forRoot(),
    CoreModule,
    InfrastructureModule,
    FeatureModule,
  ],
})
export class AppModule {}
