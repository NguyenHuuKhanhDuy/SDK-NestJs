import { UnitOfWork } from '@infrastructure/repositories/unit-of-work';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [UnitOfWork],
  exports: [UnitOfWork],
})
export class RepositoryModule {}
