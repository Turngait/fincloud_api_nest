import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BudgetEntity from './budgets.entity';
import { dateToday } from 'src/utils/date';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(BudgetEntity)
    private budgetRepository: Repository<BudgetEntity>,
  ) {}

  async addBudget(
    userId: number,
    title: string,
    balance: number,
    description: string,
    isCalc: boolean,
  ): Promise<{ status: number; budget: BudgetEntity | null; msg: string }> {
    const newBudget = new BudgetEntity();
    newBudget.balance = balance;
    newBudget.title = title;
    newBudget.user_id = userId;
    newBudget.description = description;
    newBudget.created_at = dateToday();
    newBudget.is_calculated = isCalc;

    try {
      await this.budgetRepository.save(newBudget);
      return { status: 202, budget: newBudget, msg: '' };
    } catch (err) {
      console.log(err);
      return { status: 500, budget: null, msg: err };
    }
  }
}
