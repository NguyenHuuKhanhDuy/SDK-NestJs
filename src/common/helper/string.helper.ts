export class StringHelper {
  static maskString(
    value: string,
    options?: {
      firstVisible?: number;
      lastVisible?: number;
      maskChar?: string;
      maxMaskLength?: number;
    },
  ): string {
    if (!value) {
      return '';
    }

    const {
      firstVisible = 0,
      lastVisible = 0,
      maskChar = '*',
      maxMaskLength,
    } = options || {};

    const totalLength = value.length;

    if (firstVisible + lastVisible >= totalLength) {
      return value;
    }

    const start = value.slice(0, firstVisible);
    const end = value.slice(totalLength - lastVisible);
    let maskLength = totalLength - firstVisible - lastVisible;

    if (maxMaskLength !== undefined && maxMaskLength < maskLength) {
      maskLength = maxMaskLength;
    }

    const masked = maskChar.repeat(maskLength);
    return `${start}${masked}${end}`;
  }

  static format(text: string, ...params: (string | number)[]): string {
    if (!params || params.length === 0) {
      return text;
    }

    return text.replace(/{(\d+)}/g, (match: string, index: string): string => {
      const i = Number(index);
      const value = params[i];
      return typeof value !== 'undefined' ? String(value) : match;
    });
  }

  static toFullName(firstName: string, lastName: string): string {
    return this.format('{0} {1}', firstName, lastName);
  }

  static buildQueryParams(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    for (const key in params) {
      const value = params[key];
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    }

    return searchParams.toString();
  }

  static parseBoolean(value: string | undefined): boolean {
    return value?.toString()?.toLowerCase() === 'true';
  }

  static isNullOrEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value.trim() === '';
  }

  static fallbackString(...args: (string | null | undefined)[]): string {
    for (const str of args) {
      if (!this.isNullOrEmpty(str)) {
        return str!;
      }
    }
    return '';
  }

  static generatePaddedCode(
    prefix: string,
    padding: number,
    id: number,
  ): string {
    if (padding < 1) {
      throw new Error('Padding must be greater than 0.');
    }

    return `${prefix}${id.toString().padStart(padding, '0')}`;
  }
}
