import { I18nTranslations } from '@core/services/i18n/i18n.generated';
import { Injectable, Logger } from '@nestjs/common';
import { I18nContext, I18nService, Path } from 'nestjs-i18n';

@Injectable()
export class TranslateService {
  private static i18n: I18nService<I18nTranslations> | null = null;
  private static readonly defaultLang = 'en';
  private static readonly logger = new Logger(TranslateService.name);

  constructor(i18n: I18nService<I18nTranslations>) {
    // Assign I18nService instance globally (only once)
    if (!TranslateService.i18n) {
      TranslateService.i18n = i18n;
      TranslateService.logger.log('✅ I18nService initialized globally');
    }
  }

  /**
   * Get the current I18nService instance (ensure it has been initialized)
   */
  private static getI18n(): I18nService<I18nTranslations> {
    if (!TranslateService.i18n) {
      TranslateService.logger.error('❌ I18nService not initialized');
      throw new Error('I18nService is not initialized yet!');
    }
    return TranslateService.i18n;
  }

  /**
   * Translate a key with a smart fallback
   */
  static t(
    key: Path<I18nTranslations>,
    args?: Record<string, any>,
    lang?: string,
  ): string {
    try {
      const i18n = TranslateService.getI18n();
      const currentLang =
        lang ?? I18nContext.current()?.lang ?? TranslateService.defaultLang;

      return i18n.translate(key, {
        lang: currentLang,
        args,
      });
    } catch (error) {
      TranslateService.logger.warn(
        `⚠️ Translation failed for key "${key}". Returning raw key.`,
      );
      return key as string; // Fallback to raw key to avoid crashing
    }
  }

  /**
   * Return the last segment of a translation key
   * (e.g. "business.user.not_found" → "not_found")
   */
  static code(key: Path<I18nTranslations>): string {
    return key.split('.').pop() || key;
  }

  /**
   * Return the original key (useful for logging or debugging)
   */
  static key(key: Path<I18nTranslations>): string {
    return key.toString();
  }

  /**
   * Check if the provided key belongs to business/system i18n namespaces
   */
  static isI18nKey(error: string): boolean {
    return ['business.', 'system.', 'internal.'].some((prefix) =>
      error.startsWith(prefix),
    );
  }

  /**
   * Allow reinitializing the I18nService
   * Useful for tests or hot-reload environments
   */
  static reinitialize(i18n: I18nService<I18nTranslations>) {
    TranslateService.i18n = i18n;
    TranslateService.logger.log('♻️ I18nService reinitialized');
  }
}
