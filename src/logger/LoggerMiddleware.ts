import { Logger, Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common/interfaces/middleware/nest-middleware.interface';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, params, body } = request;

    const serializedParams = Object.values(params);
    const serializedBody = JSON.stringify(body);

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `method: ${method}, url: ${originalUrl}, code: ${statusCode}, params: ${serializedParams}, body: ${serializedBody}`,
      );
    });

    next();
  }
}