import { Body, Controller, Get, Headers, Patch, Post } from '@nestjs/common';

import { AccountDTO } from './accounts.dto';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async getAccount(@Headers() headers: any): Promise<any> {
    return await this.accountsService.getAccount(headers.userId);
  }

  @Post()
  async addAccount(
    @Body() dto: { account: AccountDTO },
    @Headers() headers: any,
  ): Promise<any> {
    return await this.accountsService.addAccount(dto.account, headers.userId);
  }

  @Patch()
  async updateAccount(@Body() dto: { account: AccountDTO }): Promise<any> {
    return await this.accountsService.updateAccount(dto.account);
  }
}