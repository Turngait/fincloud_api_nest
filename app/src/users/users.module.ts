import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { BudgetsService } from 'src/budgets/budgets.service';
import { CostGroupService } from 'src/cost-group/cost-group.service';
import { IncomeSourceService } from 'src/income-source/income-source.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import AccountEntity from '../accounts/accounts.entity';
import BudgetEntity from '../budgets/budgets.entity';
import CostGroupEntity from '../cost-group/cost-group.entity';
import IncomeSourceEntity from '../income-source/income-source.entity';
import IncomesEntity from '../incomes/incomes.entity';
import CostsEntity from '../costs/costs.entity';
import { IncomesService } from 'src/incomes/incomes.service';
import { CostsService } from 'src/costs/costs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      BudgetEntity,
      CostGroupEntity,
      IncomeSourceEntity,
      IncomesEntity,
      CostsEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AccountsService,
    BudgetsService,
    CostGroupService,
    IncomeSourceService,
    IncomesService,
    CostsService,
  ],
})
export class UsersModule {}
