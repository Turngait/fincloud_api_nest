import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import AccountEntity from './accounts.entity';
import BudgetEntity from '../budgets/budgets.entity';
import { BudgetsService } from 'src/budgets/budgets.service';
import CostGroupsEntity from '../cost-group/cost-group.entity';
import IncomeSourcesEntity from '../income-source/income-source.entity';
import { IncomeSourceService } from 'src/income-source/income-source.service';
import { CostGroupService } from 'src/cost-group/cost-group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      BudgetEntity,
      CostGroupsEntity,
      IncomeSourcesEntity,
    ]),
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    BudgetsService,
    IncomeSourceService,
    CostGroupService,
  ],
  exports: [TypeOrmModule, AccountsService],
})
export class AccountsModule {}
