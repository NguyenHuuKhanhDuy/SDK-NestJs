import { ExceptionsFilter } from '@core/filter';
import { I18nTranslations } from '@core/services/i18n';
import { TranslateService } from '@core/services/i18n/i18n.service';
import { JwtAuthGuard, JwtTokenService } from '@core/services/jwt';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';
import { NestFactory, Reflector } from '@nestjs/core';
import { CommonException } from '@src/common/exceptions';
import {
  RequestContextInterceptor,
  TransformInterceptor,
} from '@src/common/interceptor';
import { ConfigEnvironmentService } from '@src/configs/config-environment.base.service';
import { SwaggerSetupModule } from '@src/infrastructure';
import { Path } from 'nestjs-i18n';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

/**
 * Custom validation exception handler
 */
function validationExceptionFactory(errors: ValidationError[]) {
  const formattedErrors = errors.map((err) => ({
    field: err.property,
    errors: Object.values(err.constraints ?? {}),
  }));

  const firstError = formattedErrors[0]?.errors[0];
  if (TranslateService.isI18nKey(firstError)) {
    return CommonException.ValidationException(
      TranslateService.t(firstError as Path<I18nTranslations>),
      TranslateService.code(firstError as Path<I18nTranslations>),
    );
  }

  return CommonException.ValidationException(firstError, 'BAD_REQUEST');
}

async function bootstrap() {
  // Create app
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Core services
  const logger = app.get(Logger);
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtTokenService);

  // Config
  const config = ConfigEnvironmentService.getIns();
  const port = config.get('APP_PORT') ?? 3000;
  const prefix = 'api';

  // App setup
  app.setGlobalPrefix(prefix);
  app.enableShutdownHooks();
  app.useLogger(logger);

  // Global guards, filters, pipes, interceptors
  app.useGlobalGuards(new JwtAuthGuard(reflector, jwtService));
  app.useGlobalFilters(new ExceptionsFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new RequestContextInterceptor());

  // Swagger
  SwaggerSetupModule.setup(app);

  // Start app
  logger.log('🚀 Starting application...');
  await app.listen(port);
  logger.log(
    `✅ Application is running on: http://localhost:${port}/${prefix}`,
  );
}

bootstrap();
