import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IIncome } from 'src/interfaces/common';
import { Repository } from 'typeorm';

import IncomeEntity from './incomes.entity';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(IncomeEntity)
    private incomeRepository: Repository<IncomeEntity>,
  ) {}

  getTest() {
    return 'It works ' + process.env.API_KEY;
  }

  async getIncomesByPeriod(period: string, userId: number): Promise<any> {
    try {
      const incomes = await this.incomeRepository.findBy({
        period,
        user_id: userId,
      });
      return { incomes, msg: '' };
    } catch (err) {
      console.log(err);
      return { incomes: null, msg: err };
    }
  }

  async addIncome(
    income: IIncome,
    userId: number,
  ): Promise<{
    status: number;
    data: { income: IncomeEntity | null; msg: string };
  }> {
    const newIncome = new IncomeEntity();
    newIncome.title = income.title;
    newIncome.amount = income.amount;
    newIncome.budget_id = income.budget_id;
    newIncome.date = new Date(income.date);
    newIncome.description = income.description;
    newIncome.month = income.month;
    newIncome.source_id = income.source_id;
    newIncome.user_id = userId;
    newIncome.year = income.year;
    newIncome.period =
      income.year + '-' + String(income.month).padStart(2, '0');
    try {
      await this.incomeRepository.save(newIncome);
      return { status: 202, data: { income: newIncome, msg: '' } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: { income: null, msg: err } };
    }
  }

  async deleteIncome(incomeId: number): Promise<{
    status: number;
    data: { isDeleted: boolean; msg: string };
  }> {
    try {
      await this.incomeRepository.delete(incomeId);
      return { status: 200, data: { isDeleted: true, msg: '' } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }
}
