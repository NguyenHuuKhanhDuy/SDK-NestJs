import { BaseController } from '@common/models';
import { Public } from '@core/decorator';
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { GetCountriesQuery } from './queries';

@Controller('countries')
@ApiTags('Country')
export class CountryController extends BaseController {
  constructor(private readonly query: QueryBus) {
    super();
  }

  @Public()
  @Get()
  async getCountries() {
    const response = await this.query.execute(new GetCountriesQuery());
    return this.successResponse(response.data);
  }
}
