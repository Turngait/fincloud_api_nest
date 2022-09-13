import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CostsModule } from './costs/costs.module';
import { IncomesModule } from './incomes/incomes.module';
import { BudgetsModule } from './budgets/budgets.module';

import { Cost } from './costs/costs.entity';

import DB_CONF from './config/db';
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
      entities: [Cost],
      synchronize: true,
    }),
    CostsModule,
    IncomesModule,
    BudgetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
