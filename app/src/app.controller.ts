import { Body, Controller, Get, Patch, Post, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { BudgetsService } from './budgets/budgets.service';
import { CostGroupService } from './cost-group/cost-group.service';
import { CostsService } from './costs/costs.service';
import { IncomeSourceService } from './income-source/income-source.service';
import { IncomesService } from './incomes/incomes.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly budgetService: BudgetsService,
    private readonly costGroupService: CostGroupService,
    private readonly incomeSourceService: IncomeSourceService,
    private readonly costsService: CostsService,
    private readonly incomesService: IncomesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  async test() {
    return 'test';
  }

  @Post('/getfindata')
  async getFinData(@Body() dto: { period: string }, @Headers() headers: any) {
    const { costs } = await this.costsService.getCostsByPeriod(
      dto.period,
      headers.userId,
    );
    const { groups } = await this.costGroupService.getCostsGroups(
      headers.userId,
    );

    const { incomes } = await this.incomesService.getIncomesByPeriod(
      dto.period,
      headers.userId,
    );

    const { sources } = await this.incomeSourceService.getIncomesSources(
      headers.userId,
    );

    const { budgets } = await this.budgetService.getBudgets(headers.userId);
    return {
      costs: { costs, groups: groups },
      incomes: { incomes, sources: sources },
      budgets,
    };
  }

  @Post('/user/signin')
  async signIn(@Body() dto: { email: string; pass: string }) {
    return await this.appService.signIn(dto.email, dto.pass);
  }

  @Post('/user/signup')
  async signUp(@Body() dto: { email: string; pass: string; name: string }) {
    const result = await this.appService.signUp(dto.email, dto.pass, dto.name);
    if (result && result.status && result.status === 202) {
      await this.budgetService.addBudget(
        +result.data.id,
        'Основной',
        0,
        '',
        true,
      );

      await this.costGroupService.addGroup('Основная', '', +result.data.id);
      await this.incomeSourceService.addSource('Основной', '', +result.data.id);
      return result;
    }
    return result;
  }

  @Patch('/user/setdata')
  async changeData() {
    return 'changeData';
  }

  @Patch('/user/changepassword')
  async changePass() {
    return 'changePass';
  }
}
