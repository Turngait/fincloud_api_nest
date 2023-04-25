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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      BudgetEntity,
      CostGroupEntity,
      IncomeSourceEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AccountsService,
    BudgetsService,
    CostGroupService,
    IncomeSourceService,
  ],
})
export class UsersModule {}
