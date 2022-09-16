import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CostsModule } from './costs/costs.module';
import { IncomesModule } from './incomes/incomes.module';
import { BudgetsModule } from './budgets/budgets.module';
import { CostGroupModule } from './cost-group/cost-group.module';
import { IncomeSourceModule } from './income-source/income-source.module';
import { UserInfoModule } from './user-info/user-info.module';

import CostEntity from './costs/costs.entity';
import IncomeEntity from './incomes/incomes.entity';
import BudgetEntity from './budgets/budgets.entity';
import CostGroupEntity from './cost-group/cost-group.entity';
import IncomeSourceEntity from './income-source/income-source.entity';
import UserInfoEntity from './user-info/user-info.entity';

import { CheckApiKeysMiddleware } from './app.middleware';

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
      entities: [
        CostEntity,
        IncomeEntity,
        BudgetEntity,
        CostGroupEntity,
        IncomeSourceEntity,
        UserInfoEntity,
      ],
      synchronize: true,
    }),
    CostsModule,
    IncomesModule,
    BudgetsModule,
    CostGroupModule,
    IncomeSourceModule,
    UserInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckApiKeysMiddleware).forRoutes('/');
  }
}
