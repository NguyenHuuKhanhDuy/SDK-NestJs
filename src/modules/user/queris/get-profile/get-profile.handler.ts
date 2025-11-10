import { Site } from '@common/enum';
import { CommonException } from '@common/exceptions';
import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { GetProfileQuery } from './get-profile.query';
import { GetProfileResponse } from './get-profile.response';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler
  implements IQueryHandler<GetProfileQuery, GetProfileResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(query: GetProfileQuery): Promise<GetProfileResponse> {
    const userId = RequestContextService.getCurrentUserId();
    const functionName = `${GetProfileHandler.name} UserId = ${userId} =>`;
    this.logger.log(functionName);
    const isSystemUser = query.site === Site.Admin;
    const user = await this.uow.users.findOne({
      where: {
        id: userId,
        isSystemUser: isSystemUser,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        provider: true,
        createdAt: true,
        countryId: true,
      },
    });
    if (!user) {
      this.logger.error(`${functionName} User not found`);
      throw CommonException.NotFound('system.NOF.NOF_ERR_001');
    }

    return new GetProfileResponse({
      id: user.id,
      email: user.email,
      countryId: user.countryId,
      createdAt: user.createdAt,
      lastName: user.lastName,
      provider: user.provider,
      firstName: user.firstName,
    });
  }
}
