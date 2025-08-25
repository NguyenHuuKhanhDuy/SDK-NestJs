import { StringHelper } from '@common/helper/string.helper';
import { JwtUserDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export interface IRequestContext {
  user: JwtUserDto;
}

@Injectable()
export class RequestContextService {
  private static asyncLocalStorage = new AsyncLocalStorage<IRequestContext>();

  static run<T>(requestContext: IRequestContext, callback: () => T): T {
    return this.asyncLocalStorage.run(requestContext, callback);
  }

  static getUserContext(): JwtUserDto | undefined {
    return this.asyncLocalStorage.getStore()['user'];
  }

  static getCurrentUserId(): string | null {
    return this.asyncLocalStorage.getStore()['user'].id;
  }

  static getCurrentUserFullName(): string | null {
    const user = this.asyncLocalStorage.getStore()['user'];
    return StringHelper.format('{0} {1}', user.firstName, user.lastName).trim();
  }
}
