import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { AppService } from './app.service';

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

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers &&
      req.headers.token &&
      typeof req.headers.token === 'string'
    ) {
      const id = await this.appService.getUserIdByToken(req.headers.token);
      if (!id && typeof id !== 'number') {
        res.json({
          status: 403,
          error: 'Incorrect token',
          appVersion: '0.8.0',
        });
      } else {
        req.headers.userId = String(id);
        next();
      }
    } else {
      res.json({
        status: 400,
        error: 'Need user token',
        appVersion: '0.8.0',
      });
    }
  }
}
