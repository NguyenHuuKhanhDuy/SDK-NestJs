import { I18nTranslations } from '@core/services/i18n';
import { TranslateService } from '@core/services/i18n/i18n.service';
import { HttpStatus } from '@nestjs/common';
import { Path } from 'nestjs-i18n';

import { BusinessException } from './business.exception';

export class CommonException {
  private static build(
    status: HttpStatus,
    key: Path<I18nTranslations>,
    args?: Record<string, any>,
  ) {
    const message = TranslateService.t(key, args);
    const code = TranslateService.code(key);
    return new BusinessException(message, code, status);
  }

  static Unauthorized(key: Path<I18nTranslations>, args?: Record<string, any>) {
    return this.build(HttpStatus.UNAUTHORIZED, key, args);
  }

  static Forbidden(key: Path<I18nTranslations>, args?: Record<string, any>) {
    return this.build(HttpStatus.FORBIDDEN, key, args);
  }

  static BadRequest(key: Path<I18nTranslations>, args?: Record<string, any>) {
    return this.build(HttpStatus.BAD_REQUEST, key, args);
  }

  static NotFound(key: Path<I18nTranslations>, args?: Record<string, any>) {
    return this.build(HttpStatus.NOT_FOUND, key, args);
  }

  static Internal(key: Path<I18nTranslations>, args?: Record<string, any>) {
    return this.build(HttpStatus.INTERNAL_SERVER_ERROR, key, args);
  }

  static ValidationException(message: string, code: string) {
    return new BusinessException(message, code, HttpStatus.BAD_REQUEST);
  }
}
