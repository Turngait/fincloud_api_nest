import { Body, Controller, Post, Put, Res, Headers } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { BudgetsService } from 'src/budgets/budgets.service';
import { CostGroupService } from 'src/cost-group/cost-group.service';
import { IncomeSourceService } from 'src/income-source/income-source.service';
import { NotifyTypes } from 'src/interfaces/common';
import { dateToday } from 'src/utils/date';
import { sendNotificationByMail } from 'src/utils/notify';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
    private readonly budgetService: BudgetsService,
    private readonly costGroupService: CostGroupService,
    private readonly incomeSourceService: IncomeSourceService,
  ) {}

  @Post('signin')
  async signIn(
    @Body() dto: { email: string; pass: string },
    @Res({ passthrough: true }) response: any,
  ) {
    const user = await this.usersService.signIn(dto.email, dto.pass);
    const { accounts } = await this.accountsService.getAccount(user.id);
    response.status(user.status);
    return { user, account: accounts[0] };
  }

  @Post('signup')
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
    const result = await this.usersService.signUp(
      dto.email,
      dto.pass,
      dto.name,
    );
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

  @Put('setname')
  async changeName(
    @Body() dto: { name: string },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.usersService.setNewName(headers.token, dto.name);
    response.status(result.status);
    return result;
  }

  @Put('changepassword')
  async changePass(
    @Body() dto: { oldPass: string; newPass: string },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.usersService.changeUserPass(
      headers.token,
      dto.oldPass,
      dto.newPass,
    );
    response.status(result.status);
    return result;
  }

  @Post('getdata')
  async getUserData(
    @Body() dto: { token: string; accountId: number },
    @Res({ passthrough: true }) response: any,
  ) {
    const userData = await this.usersService.getUserData(dto.token);
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

  @Post('restorepass')
  async restorePass(
    @Body() dto: { email: string },
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.usersService.restorePass(dto.email);
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
