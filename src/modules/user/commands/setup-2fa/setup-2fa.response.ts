export class Setup2faResponse {
  qrCode: string;
  base32: string;
  recoveryCode: string;

  constructor(partial?: Partial<Setup2faResponse>) {
    Object.assign(this, partial);
  }
}
