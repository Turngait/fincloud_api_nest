import { Body, Controller, Get, Patch, Post, Headers } from '@nestjs/common';
import { AccountsService } from './accounts/accounts.service';
import { AppService } from './app.service';
import { BudgetsService } from './budgets/budgets.service';
import { CostGroupService } from './cost-group/cost-group.service';
import { CostsService } from './costs/costs.service';
import { IncomeSourceService } from './income-source/income-source.service';
import { IncomesService } from './incomes/incomes.service';
import { dateToday } from './utils/date';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly budgetService: BudgetsService,
    private readonly costGroupService: CostGroupService,
    private readonly incomeSourceService: IncomeSourceService,
    private readonly costsService: CostsService,
    private readonly incomesService: IncomesService,
    private readonly accountsService: AccountsService,
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

    const { accounts } = await this.accountsService.getAccount(headers.userId);
    return {
      costs: { costs, groups: groups },
      incomes: { incomes, sources: sources },
      budgets,
      accounts,
    };
  }

  @Post('/user/signin')
  async signIn(@Body() dto: { email: string; pass: string }) {
    return await this.appService.signIn(dto.email, dto.pass);
  }

  @Post('/user/signup')
  async signUp(
    @Body()
    dto: {
      email: string;
      pass: string;
      name: string;
      accountTitle: string;
      currency: string;
      initialBalance: number;
    },
  ) {
    const result = await this.appService.signUp(dto.email, dto.pass, dto.name);
    if (result && result.status && result.status === 202) {
      const newAcc = {
        title: dto.accountTitle,
        description: '',
        created_at: dateToday(),
        balance: dto.initialBalance,
        currency: dto.currency,
      };
      const account = await this.accountsService.addAccount(
        newAcc,
        +result.data.id,
      );
      await this.budgetService.addBudget(
        +result.data.id,
        'Основной',
        0,
        '',
        true,
        account.data.account.id,
      );

      await this.costGroupService.addGroup(
        'Основная',
        '',
        account.data.account.id + result.data.id,
        account.data.account.id,
      );
      await this.incomeSourceService.addSource(
        'Основной',
        '',
        +result.data.id,
        account.data.account.id,
      );
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
