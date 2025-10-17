import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigEnvironmentService } from '@src/configs';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: ConfigEnvironmentService.getIns().get('REDIS_HOST'),
          port: ConfigEnvironmentService.getIns().get('REDIS_PORT'),
          password: ConfigEnvironmentService.getIns().get('REDIS_PASSWORD'),
          maxRetriesPerRequest: 2,
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueCoreModule {}
