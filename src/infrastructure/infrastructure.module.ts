// infrastructure/infrastructure.module.ts
import { DatabaseModule } from '@infrastructure/database/database.module';
import { RepositoryModule } from '@infrastructure/repositories';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, RepositoryModule],
  exports: [DatabaseModule, RepositoryModule],
})
export class InfrastructureModule {}
