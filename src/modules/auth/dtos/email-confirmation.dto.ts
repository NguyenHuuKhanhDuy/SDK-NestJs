export class EmailConfirmationDto {
  userId: string;
  token: string;

  constructor(id: string, token: string) {
    this.userId = id;
    this.token = token;
  }
}
