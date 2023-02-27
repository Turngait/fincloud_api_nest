import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CheckApiKeysMiddleware, CheckTokenMiddleware } from './app.middleware';

import DB_CONF from './config/db';

import modules from './global.modules';
import providers from './global.providers';
import entities from './global.entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_CONF.DB_HOST,
      port: DB_CONF.DB_PORT,
      username: DB_CONF.DB_USERNAME,
      password: DB_CONF.DB_PASS,
      database: DB_CONF.DB_NAME,
      entities,
      synchronize: true,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService, ...providers],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckApiKeysMiddleware).forRoutes('/');
    consumer
      .apply(CheckTokenMiddleware)
      .exclude(
        { path: 'users/signin', method: RequestMethod.POST },
        { path: 'users/signup', method: RequestMethod.POST },
      )
      .forRoutes(
        'budgets',
        'cost-group',
        'costs',
        'income-source',
        'user-info',
        'incomes',
        'accounts',
        'getfindata',
        'targets',
      );
  }
}
