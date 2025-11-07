import { CountryController } from '@modules/country/country.controller';
import { Module } from '@nestjs/common';
import { IntegrationsModule } from '@src/integrations/integrations.module';

import { queryHandlers } from './queries';

@Module({
  imports: [IntegrationsModule],
  providers: [...queryHandlers],
  controllers: [CountryController],
})
export class CountryModule {}
