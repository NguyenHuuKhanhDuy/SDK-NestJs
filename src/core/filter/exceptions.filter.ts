import { TranslateService } from '@core/services/i18n/i18n.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BusinessException } from '@src/common/exceptions/business.exception';
import { IErrorResponse } from '@src/common/interface/base.interface';
import { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const baseResponse: IErrorResponse<null> = {
      success: false,
      errorMessage: TranslateService.t('system.EXH.EXH_ERR_001'),
      errorMessageCode: TranslateService.code('system.EXH.EXH_ERR_001'),
      data: null,
    };

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: any = {};

    if (exception instanceof BusinessException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      errorResponse =
        typeof res === 'string'
          ? { message: res }
          : (res as Record<string, any>);
      baseResponse.errorMessage =
        errorResponse.message ?? baseResponse.errorMessage;
      baseResponse.errorMessageCode =
        errorResponse.errorCode ?? baseResponse.errorMessageCode;
    } else if (exception instanceof Error) {
      this.logger.error(
        {
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          status,
          error: exception.stack,
        },
        'Unhandled system error',
      );
    } else {
      this.logger.error(
        {
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          status,
          error: exception,
        },
        'Unknown exception',
      );
    }

    response.status(status).json(baseResponse);
  }
}
