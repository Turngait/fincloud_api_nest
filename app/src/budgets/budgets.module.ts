import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';

import BudgetEntity from './budgets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetEntity])],
  controllers: [BudgetsController],
  providers: [BudgetsService],
})
export class BudgetsModule {}
