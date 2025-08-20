import { HttpException } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, errorCode: string, statusCode: number) {
    super(
      {
        statusCode,
        errorCode,
        message,
      },
      statusCode,
    );
  }
}
