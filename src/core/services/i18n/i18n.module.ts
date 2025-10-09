import * as process from 'node:process';

import { EnvKey } from '@common/constant';
import { TranslateService } from '@core/services/i18n/i18n.service';
import { Module } from '@nestjs/common';
import { NODE_ENV } from '@src/common/enum/common.enum';
import { ConfigEnvironmentService } from '@src/configs/config-environment.base.service';
import {
  AcceptLanguageResolver,
  I18nModule as I18nModuleImport,
} from 'nestjs-i18n';
import * as path from 'path';
const isLocal =
  ConfigEnvironmentService.getIns().get(EnvKey.App.NodeEnv) === NODE_ENV.LOCAL;
@Module({
  imports: [
    I18nModuleImport.forRoot({
      fallbackLanguage: 'en-US',
      loaderOptions: {
        path: path.join(__dirname, '/'),
        watch: true,
      },
      typesOutputPath: isLocal
        ? path.join(process.cwd(), '/src/core/services/i18n/i18n.generated.ts')
        : undefined,
      resolvers: [AcceptLanguageResolver],
    }),
  ],
  providers: [TranslateService],
})
export class I18nModule {}
