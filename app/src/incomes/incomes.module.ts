import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';

import IncomeEntity from './incomes.entity';
import AccountEntity from 'src/accounts/accounts.entity';
import BudgetEntity from 'src/budgets/budgets.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { BudgetsService } from 'src/budgets/budgets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IncomeEntity, AccountEntity, BudgetEntity]),
  ],
  controllers: [IncomesController],
  providers: [IncomesService, AccountsService, BudgetsService],
  exports: [TypeOrmModule, IncomesService],
})
export class IncomesModule {}
