import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Put,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { BudgetsService } from 'src/budgets/budgets.service';
import { CostGroupService } from 'src/cost-group/cost-group.service';
import { IncomeSourceService } from 'src/income-source/income-source.service';

import { AccountDTO } from './accounts.dto';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly budgetsService: BudgetsService,
    private readonly costGroupsService: CostGroupService,
    private readonly incomeSourcesService: IncomeSourceService,
  ) {}

  @Get()
  async getAccount(@Headers() headers: any): Promise<any> {
    return await this.accountsService.getAccount(headers.userId);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async addAccount(
    @Body() dto: { account: AccountDTO },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ): Promise<any> {
    const result = await this.accountsService.addAccount(
      dto.account,
      headers.userId,
    );
    response.status(result.status);

    if (result.status === 202) {
      await this.budgetsService.addBudget(
        headers.userId,
        dto.account.title,
        dto.account.description,
        true,
        result.data.account.id,
        dto.account.balance,
      );

      await this.costGroupsService.addGroup(
        dto.account.title,
        '',
        headers.userId,
        result.data.account.id,
        0,
      );

      await this.incomeSourcesService.addSource(
        dto.account.title,
        '',
        headers.userId,
        result.data.account.id,
        0,
      );
    }
    return result;
  }

  @UsePipes(new ValidationPipe())
  @Put()
  async updateAccount(
    @Body() dto: { account: AccountDTO },
    @Res({ passthrough: true }) response: any,
  ): Promise<any> {
    const result = await this.accountsService.updateAccount(dto.account);
    response.status(result.status);
    return result;
  }

  @Delete()
  async deleteAccount(
    @Body() dto: { accountId: number },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ): Promise<any> {
    const result = await this.accountsService.deleteAccount(
      dto.accountId,
      headers.userId,
    );
    response.status(result.status);
    if (result.status === 200) {
      await this.budgetsService.deleteBudgetsByAccID(dto.accountId);
      await this.incomeSourcesService.deleteAllSourcesByAccId(dto.accountId);
      await this.costGroupsService.deleteAllGroupsByAccId(dto.accountId);
    }

    return result;
  }
}
