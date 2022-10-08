import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAccount } from 'src/interfaces/common';
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
      return { accounts: null, msg: err };
    }
  }

  async getAccountByID(
    accountID: number,
  ): Promise<{ account: AccountEntity | null; msg: string }> {
    try {
      const account = await this.accountsRepository.findOneBy({
        id: accountID,
      });
      return { account, msg: '' };
    } catch (err) {
      console.log(err);
      return { account: null, msg: err };
    }
  }

  async deleteAccount(accountID: number): Promise<any> {
    try {
      await this.accountsRepository.delete(accountID);
      return { status: 200, data: { isDeleted: true, msg: '' } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }

  async decreesBalance(accountID: number, amount: number) {
    try {
      const { account } = await this.getAccountByID(accountID);
      account.balance = account.balance - amount;
      this.accountsRepository.save(account);
      return {
        status: 200,
        data: { isChanged: true, balance: account.balance, msg: '' },
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        data: { isChanged: false, balance: null, msg: err },
      };
    }
  }
}
