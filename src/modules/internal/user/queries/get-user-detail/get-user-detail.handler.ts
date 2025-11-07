import { CommonException } from '@common/exceptions';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { GetUserDetailQuery } from './get-user-detail.query';
import { GetUserDetailResponse } from './get-user-detail.response';

@QueryHandler(GetUserDetailQuery)
export class GetUserDetailHandler
  implements IQueryHandler<GetUserDetailQuery, GetUserDetailResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(query: GetUserDetailQuery): Promise<GetUserDetailResponse> {
    const userId = query.userId;
    const functionName = `${GetUserDetailHandler.name} UserId = ${userId} =>`;
    this.logger.log(functionName);
    const user = await this.uow.users.findOne({
      where: {
        id: userId,
      },
      withDeleted: true,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        provider: true,
        createdAt: true,
        isConfirmed: true,
        status: true,
        countryId: true,
        updatedAt: true,
        updatedBy: true,
        deletedAt: true,
        deletedBy: true,
      },
    });

    if (!user) {
      this.logger.warn(`${functionName} User not found`);
      throw CommonException.NotFound('internal.USER.USER_ERR_001');
    }

    return new GetUserDetailResponse({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      provider: user.provider,
      createdAt: user.createdAt,
      isConfirmed: user.isConfirmed,
      status: user.status,
      countryId: user.countryId,
      updatedAt: user.updatedAt,
      updatedBy: user.updatedBy,
      deletedAt: user.deletedAt,
      deletedBy: user.deletedBy,
    });
  }
}
