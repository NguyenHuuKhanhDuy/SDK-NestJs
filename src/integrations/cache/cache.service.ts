import { BaseRedisService } from '@core/services/redis';
import { RedisConstant } from '@core/services/redis/redis.constants';
import { Country } from '@infrastructure/entities/country.entity';
import { UnitOfWork } from '@infrastructure/repositories/unit-of-work';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(
    private readonly redis: BaseRedisService,
    private readonly uow: UnitOfWork,
  ) {}

  async getCountries(): Promise<Country[]> {
    const cached = await this.redis.get<Country[]>(RedisConstant.Key.Countries);
    if (cached?.length) {
      return cached;
    }

    const countries = await this.uow.countries.find({ order: { name: 'ASC' } });
    await this.redis.set(RedisConstant.Key.Countries, countries);
    return countries;
  }
}
