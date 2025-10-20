export class ForgotPasswordDto {
  constructor(token: string, userId: string) {
    this.token = token;
    this.userId = userId;
  }

  token: string;
  userId: string;
}
