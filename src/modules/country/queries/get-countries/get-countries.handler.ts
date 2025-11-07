import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CacheService } from '@src/integrations';

import { GetCountriesQuery } from './get-countries.query';
import {
  GetCountriesItemResponse,
  GetCountriesResponse,
} from './get-countries.response';

@QueryHandler(GetCountriesQuery)
export class GetCountriesHandler
  implements IQueryHandler<GetCountriesQuery, GetCountriesResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly cacheService: CacheService,
  ) {}

  async execute(): Promise<GetCountriesResponse> {
    const functionName = `${GetCountriesHandler.name} =>`;
    this.logger.log(functionName);
    const countries = await this.cacheService.getCountries();
    const response = new GetCountriesResponse();
    response.data = countries.map(
      (x) =>
        new GetCountriesItemResponse({
          id: x.id,
          name: x.name,
          alpha2Code: x.alpha2Code,
          alpha3Code: x.alpha3Code,
          flagUrl: x.flagUrl,
          dialCode: x.dialCode,
        }),
    );

    return response;
  }
}
