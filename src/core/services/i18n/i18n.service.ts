import { I18nTranslations } from '@core/services/i18n/i18n.generated';
import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService, Path } from 'nestjs-i18n';

@Injectable()
export class TranslateService {
  private static i18n: I18nService<I18nTranslations>;

  constructor(i18n: I18nService<I18nTranslations>) {
    TranslateService.i18n = i18n;
  }

  static t(
    key: Path<I18nTranslations>,
    args?: Record<string, any>,
    lang?: string,
  ): string {
    if (!TranslateService.i18n) {
      throw new Error('I18nService is not initialized yet!');
    }

    const requestLang = lang ?? I18nContext.current()?.lang ?? 'en';

    return TranslateService.i18n.translate(key, {
      lang: requestLang,
      args,
    });
  }

  static code(key: Path<I18nTranslations>): string {
    return key.split('.').pop() || key;
  }

  static key(key: Path<I18nTranslations>): string {
    return key.toString();
  }

  static isI18nKey(error: string): boolean {
    return error.startsWith('business.') || error.startsWith('system.');
  }
}
