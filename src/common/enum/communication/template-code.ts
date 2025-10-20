export enum TemplateCode {
  E000001,
  E000002,
  N000001,
}

const NotificationTemplateCodes = [TemplateCode.N000001] as const;
export type NotificationTemplateCode =
  (typeof NotificationTemplateCodes)[number];
