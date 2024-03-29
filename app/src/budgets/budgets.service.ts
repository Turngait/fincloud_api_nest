import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

import BudgetEntity from './budgets.entity';
import { dateToday } from 'src/utils/date';
import { IBudget, TypeOfOps } from 'src/interfaces/common';
import log, { LogLevels } from 'src/logger';
import { TransferBetweenBudgetsDTO } from './budgets.dto';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(BudgetEntity)
    private budgetRepository: Repository<BudgetEntity>,
    private dataSource: DataSource,
  ) {}

  async addBudget(
    userId: number,
    title: string,
    description: string,
    isCalc: boolean,
    account_id: number,
    balance = 0,
  ): Promise<{ status: number; budget: BudgetEntity | null; msg: string }> {
    const newBudget = new BudgetEntity();
    newBudget.balance = balance;
    newBudget.title = title;
    newBudget.user_id = userId;
    newBudget.description = description;
    newBudget.created_at = dateToday();
    newBudget.is_calculated = isCalc;
    newBudget.account_id = account_id;

    try {
      await this.budgetRepository.save(newBudget);
      return { status: 202, budget: newBudget, msg: '' };
    } catch (err) {
      console.log(err);
      log(`From budget service: ${err}`, LogLevels.ERROR);
      return { status: 500, budget: null, msg: err };
    }
  }

  async getBudgets(
    userId: number,
    accountID: number,
  ): Promise<{ budgets: BudgetEntity[] | null; msg: string }> {
    try {
      const budgets = await this.budgetRepository.findBy({
        user_id: userId,
        account_id: accountID,
      });
      return { budgets, msg: '' };
    } catch (err) {
      console.log(err);
      log(`From budget service: ${err}`, LogLevels.ERROR);
      return { budgets: null, msg: err };
    }
  }

  async getBudgetByID(
    budgetID: number,
  ): Promise<{ budget: BudgetEntity | null; msg: string }> {
    try {
      const budget = await this.budgetRepository.findOneBy({ id: budgetID });
      return { budget, msg: '' };
    } catch (err) {
      console.log(err);
      log(`From budget service: ${err}`, LogLevels.ERROR);
      return { budget: null, msg: err };
    }
  }

  async changeBalance(
    budgetID: number,
    amount: number,
    type: TypeOfOps,
  ): Promise<{
    status: number;
    data: { isChanged: boolean; balance: number | null; msg: string };
  }> {
    try {
      const { budget } = await this.getBudgetByID(budgetID);
      if (!budget) throw new NotFoundException();
      if (type === TypeOfOps.DECREASE) {
        budget.balance = budget.balance - amount;
      }
      if (type === TypeOfOps.INCREASE) {
        budget.balance = budget.balance + amount;
      }
      await this.budgetRepository.save(budget);
      return {
        status: 200,
        data: { isChanged: true, balance: budget.balance, msg: '' },
      };
    } catch (err) {
      console.log(err);
      log(`From budget service: ${err}`, LogLevels.ERROR);
      return {
        status: 500,
        data: { isChanged: false, balance: null, msg: err },
      };
    }
  }

  async deleteBudget(budgetId: number): Promise<{
    status: number;
    data: { isDeleted: boolean; msg: string };
  }> {
    try {
      const { budget } = await this.getBudgetByID(budgetId);
      if (budget.balance !== 0) {
        return {
          status: 401,
          data: { isDeleted: false, msg: 'Budget not equal zero' },
        };
      }
      await this.budgetRepository.delete(budgetId);
      return {
        status: 200,
        data: { isDeleted: true, msg: '' },
      };
    } catch (err) {
      console.log(err);
      log(`From budget service: ${err}`, LogLevels.ERROR);
      return {
        status: 500,
        data: { isDeleted: false, msg: err },
      };
    }
  }

  async deleteBudgetsByAccID(account_id: number): Promise<{
    status: number;
    data: { isDeleted: boolean; msg: string };
  }> {
    try {
      await this.budgetRepository.delete({ account_id });
      return {
        status: 200,
        data: { isDeleted: true, msg: '' },
      };
    } catch (err) {
      console.log(err);
      log(`From budget service: ${err}`, LogLevels.ERROR);
      return {
        status: 500,
        data: { isDeleted: false, msg: err },
      };
    }
  }

  async deleteAllBudgets(user_id: number): Promise<{ isSuccess: boolean }> {
    try {
      await this.budgetRepository.delete({ user_id });
      return { isSuccess: true };
    } catch (err) {
      console.log(err);
      log(`From cost service: ${err}`, LogLevels.ERROR);
      return { isSuccess: false };
    }
  }

  async editBudget(newBudget: IBudget): Promise<{
    status: number;
    data: { isUpdated: boolean; msg: string };
  }> {
    try {
      const { budget } = await this.getBudgetByID(newBudget.id);
      if (!budget) throw new NotFoundException();

      budget.title = newBudget.title;
      budget.balance = newBudget.balance;
      budget.description = newBudget.description;
      budget.is_calculated = newBudget.is_calculating;

      await this.budgetRepository.save(budget);

      return {
        status: 200,
        data: { isUpdated: true, msg: '' },
      };
    } catch (err) {
      console.log(err);
      log(`From budget service: ${err}`, LogLevels.ERROR);
      return {
        status: 500,
        data: { isUpdated: false, msg: err },
      };
    }
  }

  async transferBetweenBudgets(
    data: TransferBetweenBudgetsDTO,
  ): Promise<{ status: number }> {
    try {
      let budgetData = await this.getBudgetByID(data.from_budget_id);
      const fromBudget = budgetData.budget;

      budgetData = await this.getBudgetByID(data.to_budget_id);
      const toBudget = budgetData.budget;

      if (!fromBudget || !toBudget) return { status: 400 };

      fromBudget.balance = fromBudget.balance - data.amount;
      toBudget.balance = toBudget.balance + data.amount;

      await this.dataSource.transaction(async () => {
        await this.budgetRepository.save(fromBudget);
        await this.budgetRepository.save(toBudget);
      });

      return { status: 200 };
    } catch (err) {
      console.log(err);
      log(`From budget service: ${err}`, LogLevels.ERROR);
      return {
        status: 500,
      };
    }
  }
}
