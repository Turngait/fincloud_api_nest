import { BudgetsService } from './budgets/budgets.service';
import { CostGroupService } from './cost-group/cost-group.service';
import { IncomeSourceService } from './income-source/income-source.service';
import { CostsService } from './costs/costs.service';
import { IncomesService } from './incomes/incomes.service';
import { AccountsService } from './accounts/accounts.service';
import { TargetsService } from './costs/targets/targets.service';
import { UsersService } from './users/users.service';

export default [
  BudgetsService,
  CostGroupService,
  IncomeSourceService,
  CostsService,
  IncomesService,
  AccountsService,
  TargetsService,
  UsersService,
];
