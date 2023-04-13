import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import IncomeEntity from 'src/incomes/incomes.entity';
import CostEntity from 'src/costs/costs.entity';
import AccountEntity from 'src/accounts/accounts.entity';
import BudgetEntity from 'src/budgets/budgets.entity';
import TargetEntity from 'src/costs/targets/targets.entity';
import CostGroupEntity from 'src/cost-group/cost-group.entity';
import IncomeSourceEntity from 'src/income-source/income-source.entity';

import { IncomesService } from 'src/incomes/incomes.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { BudgetsService } from 'src/budgets/budgets.service';
import { CostsService } from 'src/costs/costs.service';
import { TargetsService } from 'src/costs/targets/targets.service';
import { CostGroupService } from 'src/cost-group/cost-group.service';
import { IncomeSourceService } from 'src/income-source/income-source.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IncomeEntity,
      AccountEntity,
      BudgetEntity,
      CostEntity,
      TargetEntity,
      CostGroupEntity,
      IncomeSourceEntity,
    ]),
  ],
  controllers: [FinanceController],
  providers: [
    IncomesService,
    AccountsService,
    BudgetsService,
    CostsService,
    TargetsService,
    CostGroupService,
    IncomeSourceService,
  ],
})
export class FinanceModule {}
