import { LanguageConstant } from '@common/constant';
import { Language } from '@core/services/communication';

export class CommonHelper {
  static getTemplateByLanguage(languages: Language[], lang: string): string {
    if (languages.length === 0) {
      return String();
    }

    if (!lang) {
      return this.getDefaultEnTemplate(languages);
    }

    const templateContentByLang = languages.find((x) => x.name === lang);
    if (!templateContentByLang) {
      return this.getDefaultEnTemplate(languages);
    }

    const valueTemplateContentByLang = this.decodeUrl(
      templateContentByLang.value,
    );
    if (!valueTemplateContentByLang) {
      return this.getDefaultEnTemplate(languages);
    }

    return valueTemplateContentByLang;
  }

  static getDefaultEnTemplate(languages: Language[]): string | null {
    const enLanguage = languages.find(
      (l) => l.name === LanguageConstant.Default,
    );
    if (!enLanguage) {
      throw new Error('English language not found');
    }

    return this.decodeUrl(enLanguage.value);
  }

  static decodeUrl(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch {
      throw new Error('Error decoding URL');
    }
  }

  static encodeUrl(value: string): string {
    try {
      return encodeURIComponent(value);
    } catch {
      throw new Error('Error encoding URL');
    }
  }
}
