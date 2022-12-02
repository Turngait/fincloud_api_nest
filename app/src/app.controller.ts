import { Body, Controller, Get, Post, Headers, Put, Res } from '@nestjs/common';
import { AccountsService } from './accounts/accounts.service';
import { AppService } from './app.service';
import { BudgetsService } from './budgets/budgets.service';
import { CostGroupService } from './cost-group/cost-group.service';
import { CostsService } from './costs/costs.service';
import { IncomeSourceService } from './income-source/income-source.service';
import { IncomesService } from './incomes/incomes.service';
import { NotifyTypes } from './interfaces/common';
import log from './logger';
import { dateToday } from './utils/date';
import { sendNotificationByMail } from './utils/notify';

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
  async test(@Res({ passthrough: true }) response: any) {
    log('Hello. It is test');
    // console.log(response.status(400));
    response.status(203);
    return 'test';
  }

  // TODO Move all this to another Module
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
    response.status(200);
    return {
      costs: { costs, groups, graphData },
      incomes: { incomes, sources, incomeGraphData },
      budgets,
      accounts,
    };
  }

  @Post('/user/signin')
  async signIn(
    @Body() dto: { email: string; pass: string },
    @Res({ passthrough: true }) response: any,
  ) {
    const user = await this.appService.signIn(dto.email, dto.pass);
    const { accounts } = await this.accountsService.getAccount(user.id);
    response.status(user.status);
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
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.appService.signUp(dto.email, dto.pass, dto.name);
    response.status(result.status);
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
        dto.accountTitle,
        '',
        true,
        account.data.account.id,
        dto.initialBalance,
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

      // TODO Move to middleware
      sendNotificationByMail({
        to: dto.email,
        name: dto.name,
        pass: dto.pass,
        type: NotifyTypes.signUp,
      });
      return result;
    }
    return result;
  }

  @Put('/user/setname')
  async changeName(
    @Body() dto: { name: string },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.appService.setNewName(headers.token, dto.name);
    response.status(result.status);
    return result;
  }

  @Put('/user/changepassword')
  async changePass(
    @Body() dto: { oldPass: string; newPass: string },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.appService.changeUserPass(
      headers.token,
      dto.oldPass,
      dto.newPass,
    );
    response.status(result.status);
    return result;
  }

  @Post('/user/getdata')
  async getUserData(
    @Body() dto: { token: string; accountId: number },
    @Res({ passthrough: true }) response: any,
  ) {
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
    if (!userData) response.status(500);
    return { userData, balance, groups, sources };
  }

  @Post('/user/restorepass')
  async restorePass(
    @Body() dto: { email: string },
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.appService.restorePass(dto.email);
    response.status(result.status);
    if (result.status === 200) {
      sendNotificationByMail({
        to: dto.email,
        name: result.data.name,
        pass: result.data.pass,
        type: NotifyTypes.restorePwd,
      });
    }

    return result;
  }
}
