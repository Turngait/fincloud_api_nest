import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostsController } from './costs.controller';
import { CostsService } from './costs.service';

import CostEntity from './costs.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import AccountEntity from 'src/accounts/accounts.entity';
import BudgetEntity from 'src/budgets/budgets.entity';
import { BudgetsService } from 'src/budgets/budgets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostEntity, AccountEntity, BudgetEntity]),
  ],
  controllers: [CostsController],
  providers: [CostsService, AccountsService, BudgetsService],
  exports: [TypeOrmModule, CostsService],
})
export class CostsModule {}
