import { Body, Controller, Post, Headers, Res } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { BudgetsService } from '../budgets/budgets.service';
import { CostGroupService } from '../cost-group/cost-group.service';
import { CostsService } from '../costs/costs.service';
import { TargetsService } from '../costs/targets/targets.service';
import { IncomeSourceService } from '../income-source/income-source.service';
import { IncomesService } from '../incomes/incomes.service';

@Controller('')
export class FinanceController {
  constructor(
    private readonly budgetService: BudgetsService,
    private readonly costGroupService: CostGroupService,
    private readonly incomeSourceService: IncomeSourceService,
    private readonly costsService: CostsService,
    private readonly incomesService: IncomesService,
    private readonly accountsService: AccountsService,
    private readonly targetsService: TargetsService,
  ) {}

  @Post('/getfindata')
  async getFinData(
    @Body() dto: { period: string; accountID: number },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const { costs, graphData } = await this.costsService.getCostsByPeriod(
      dto.period,
      headers.userId,
      dto.accountID,
    );
    const { groups } = await this.costGroupService.getCostsGroups(
      headers.userId,
      dto.accountID,
    );

    const { incomes, incomeGraphData } =
      await this.incomesService.getIncomesByPeriod(
        dto.period,
        headers.userId,
        dto.accountID,
      );

    const { sources } = await this.incomeSourceService.getIncomesSources(
      headers.userId,
      dto.accountID,
    );

    const { budgets } = await this.budgetService.getBudgets(
      headers.userId,
      dto.accountID,
    );

    const { accounts } = await this.accountsService.getAccount(headers.userId);

    const { data } = await this.targetsService.getAllTargetsForAccount(
      dto.accountID,
    );
    // this.targetsService.calculateMonthlyTargets(data.targets.month, costs);
    response.status(200);
    return {
      costs: { costs, groups, graphData },
      incomes: { incomes, sources, incomeGraphData },
      budgets,
      accounts,
      targets: data.targets,
    };
  }
}
