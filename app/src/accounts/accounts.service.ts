import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAccount, TypeOfOps } from 'src/interfaces/common';
import log, { LogLevels } from 'src/logger';
import { Repository } from 'typeorm';

import AccountEntity from './accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountsRepository: Repository<AccountEntity>,
  ) {}

  async addAccount(
    account: IAccount,
    userId: number,
  ): Promise<{
    status: number;
    data: { account: AccountEntity | null; msg: string };
  }> {
    const newAccount = new AccountEntity();
    newAccount.title = account.title;
    newAccount.description = account.description;
    newAccount.created_at = account.created_at;
    newAccount.currency = account.currency;
    newAccount.balance = account.balance;
    newAccount.is_active = true;
    newAccount.user_id = userId;

    try {
      await this.accountsRepository.save(newAccount);
      return { status: 202, data: { account: newAccount, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From account service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { account: null, msg: err } };
    }
  }

  async getAccount(
    userId: number,
  ): Promise<{ accounts: AccountEntity[] | null; msg: string }> {
    try {
      const accounts = await this.accountsRepository.findBy({
        user_id: userId,
      });
      return { accounts, msg: '' };
    } catch (err) {
      console.log(err);
      log(`From account service: ${err}`, LogLevels.ERROR);
      return { accounts: null, msg: err };
    }
  }

  async getAccountByID(
    accountID: number,
  ): Promise<{ account: AccountEntity | null; msg: string }> {
    if (!accountID) return { account: null, msg: 'Id is not correct' };
    try {
      const account = await this.accountsRepository.findOneBy({
        id: accountID,
      });
      return { account, msg: '' };
    } catch (err) {
      console.log(err);
      log(`From account service: ${err}`, LogLevels.ERROR);
      return { account: null, msg: err };
    }
  }

  async deleteAccount(
    accountID: number,
  ): Promise<{ status: number; data: { isDeleted: boolean; msg: string } }> {
    try {
      await this.accountsRepository.delete(accountID);
      return { status: 200, data: { isDeleted: true, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From account service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }

  async changeBalance(
    accountID: number,
    amount: number,
    type: TypeOfOps,
  ): Promise<{
    status: number;
    data: { isChanged: boolean; balance: number | null; msg: string };
  }> {
    try {
      const { account } = await this.getAccountByID(accountID);
      if (type === TypeOfOps.DECREASE) {
        account.balance = account.balance - amount;
      }
      if (type === TypeOfOps.INCREASE) {
        account.balance = account.balance + amount;
      }
      await this.accountsRepository.save(account);
      return {
        status: 200,
        data: { isChanged: true, balance: account.balance, msg: '' },
      };
    } catch (err) {
      console.log(err);
      log(`From account service: ${err}`, LogLevels.ERROR);
      return {
        status: 500,
        data: { isChanged: false, balance: null, msg: err },
      };
    }
  }

  async updateAccount(newAccount: IAccount): Promise<{
    status: number;
    data: { isUpdated: boolean; msg: string };
  }> {
    const { account } = await this.getAccountByID(newAccount.id);
    if (!account) throw new NotFoundException();
    account.title = newAccount.title;
    account.description = newAccount.description;
    try {
      await this.accountsRepository.save(account);

      return { status: 200, data: { isUpdated: true, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From account service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { isUpdated: false, msg: err } };
    }
  }
}
