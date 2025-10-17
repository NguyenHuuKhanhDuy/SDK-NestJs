export class LanguagesJsonbType {
  languages: Language[];

  constructor(partial?: Partial<LanguagesJsonbType>) {
    Object.assign(this, partial);
  }
}

export class Language {
  name: string;
  value: string;

  constructor(partial?: Partial<Language>) {
    Object.assign(this, partial);
  }
}
