import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
// import { request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    // console.log('from all exception filter');
    // console.log(exception);

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // const { error, message, statusCode } = (
    //   exception as HttpException
    // ).getResponse() as HttpExceptionResponse;

    console.log('from all exception filter');

    const message = exception['response']?.message || '';
    if (message.includes('refreshToken must be a jwt string')) {
      httpStatus = 401;
    }

    process.on('uncaughtException', (err, source) => {
      console.log('from uncaughtException');
      console.log(err);
      console.log(source);
    });

    // const { url, query, body } = request;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
