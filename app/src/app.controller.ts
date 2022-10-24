import { Body, Controller, Get, Post, Headers, Put } from '@nestjs/common';
import { AccountsService } from './accounts/accounts.service';
import { AppService } from './app.service';
import { BudgetsService } from './budgets/budgets.service';
import { CostGroupService } from './cost-group/cost-group.service';
import { CostsService } from './costs/costs.service';
import { IncomeSourceService } from './income-source/income-source.service';
import { IncomesService } from './incomes/incomes.service';
import log from './logger';
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
    log('Hello. It is test');
    return 'test';
  }

  @Post('/getfindata')
  async getFinData(
    @Body() dto: { period: string; accountID: number },
    @Headers() headers: any,
  ) {
    const { costs } = await this.costsService.getCostsByPeriod(
      dto.period,
      headers.userId,
      dto.accountID,
    );
    const { groups } = await this.costGroupService.getCostsGroups(
      headers.userId,
      dto.accountID,
    );

    const { incomes } = await this.incomesService.getIncomesByPeriod(
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
    return {
      costs: { costs, groups },
      incomes: { incomes, sources },
      budgets,
      accounts,
    };
  }

  @Post('/user/signin')
  async signIn(@Body() dto: { email: string; pass: string }) {
    const user = await this.appService.signIn(dto.email, dto.pass);
    const { accounts } = await this.accountsService.getAccount(user.id);
    return { user, account: accounts[0] };
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
        '',
        true,
        account.data.account.id,
      );

      await this.costGroupService.addGroup(
        'Основная',
        '',
        +result.data.id,
        account.data.account.id,
      );
      await this.incomeSourceService.addSource(
        'Основной',
        '',
        +result.data.id,
        account.data.account.id,
      );
      result.data.accountId = account.data.account.id;
      return result;
    }
    return result;
  }

  @Put('/user/setname')
  async changeName(@Body() dto: { name: string }, @Headers() headers: any) {
    return await this.appService.setNewName(headers.token, dto.name);
  }

  @Put('/user/changepassword')
  async changePass(
    @Body() dto: { oldPass: string; newPass: string },
    @Headers() headers: any,
  ) {
    return await this.appService.changeUserPass(
      headers.token,
      dto.oldPass,
      dto.newPass,
    );
  }

  @Post('/user/getdata')
  async getUserData(@Body() dto: { token: string; accountId: number }) {
    const userData = await this.appService.getUserData(dto.token);
    const { groups } = await this.costGroupService.getCostsGroups(
      userData.id,
      dto.accountId,
    );
    const { sources } = await this.incomeSourceService.getIncomesSources(
      userData.id,
      dto.accountId,
    );
    const { balance } = await this.accountsService.getBalance(dto.accountId);
    return { userData, balance, groups, sources };
  }
}
