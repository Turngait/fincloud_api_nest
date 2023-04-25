import { CostsModule } from './costs/costs.module';
import { IncomesModule } from './incomes/incomes.module';
import { BudgetsModule } from './budgets/budgets.module';
import { CostGroupModule } from './cost-group/cost-group.module';
import { IncomeSourceModule } from './income-source/income-source.module';
import { UserInfoModule } from './user-info/user-info.module';
import { AccountsModule } from './accounts/accounts.module';
import { TargetsModule } from './costs/targets/targets.module';
import { UsersModule } from './users/users.module';

export default [
  CostsModule,
  IncomesModule,
  BudgetsModule,
  CostGroupModule,
  IncomeSourceModule,
  UserInfoModule,
  AccountsModule,
  TargetsModule,
  UsersModule,
];
