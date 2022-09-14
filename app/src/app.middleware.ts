import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckApiKeysMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers['api-key'] &&
      req.headers['api-key'] === this.configService.get('API_KEY')
    ) {
      next();
    } else {
      res.json({
        status: 403,
        error: 'Incorrect Api key',
        appVersion: '0.8.0',
      });
    }
  }
}
