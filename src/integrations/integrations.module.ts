import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { RepositoryModule } from '@src/infrastructure';
import { CacheService } from '@src/integrations/cache/cache.service';

@Module({
  imports: [CoreModule, RepositoryModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class IntegrationsModule {}
