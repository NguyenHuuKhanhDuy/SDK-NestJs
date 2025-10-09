import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { RedisService } from '@core/services/redis';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LogoutCommand } from './logout.command';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly redisService: RedisService,
  ) {}

  async execute(): Promise<any> {
    const user = RequestContextService.getUserContext();
    const functionName = `${LogoutHandler.name} UserId = ${user.id}, SessionId = ${user.sessionId} =>`;
    this.logger.log(functionName);
    await this.redisService.removeSession(user.id, user.sessionId);
    return;
  }
}
