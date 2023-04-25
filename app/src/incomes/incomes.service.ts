import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IIncome } from 'src/interfaces/common';
import log, { LogLevels } from 'src/logger';
import { Repository } from 'typeorm';

import IncomeEntity from './incomes.entity';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(IncomeEntity)
    private incomeRepository: Repository<IncomeEntity>,
  ) {}

  async getIncomesByPeriod(
    period: string,
    userId: number,
    accountID: number,
  ): Promise<{
    incomes: IncomeEntity[] | null;
    incomeGraphData: any;
    msg: string;
  }> {
    try {
      const incomes = await this.incomeRepository.findBy({
        period,
        user_id: userId,
        account_id: accountID,
      });
      const graphData = this.addGraphData(incomes);
      return {
        incomes: this.normalizeIncomes(incomes),
        incomeGraphData: graphData,
        msg: '',
      };
    } catch (err) {
      console.log(err);
      log(`From income service: ${err}`, LogLevels.ERROR);
      return { incomes: null, incomeGraphData: null, msg: err };
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
    newIncome.account_id = income.account_id;
    newIncome.period =
      income.year + '-' + String(income.month).padStart(2, '0');
    try {
      await this.incomeRepository.save(newIncome);
      return { status: 202, data: { income: newIncome, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From income service: ${err}`, LogLevels.ERROR);
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
      log(`From income service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }

  // TODO In develop
  async deleteIncomesBySourceID(source_id: number): Promise<{
    status: number;
    data: { isDeleted: boolean; msg: string };
  }> {
    try {
      await this.incomeRepository
        .createQueryBuilder()
        .delete()
        .from('income')
        .where('source_id=:source_id', { source_id })
        .execute();
      return { status: 200, data: { isDeleted: true, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From cost service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }

  addGraphData(incomes) {
    const items = incomes.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return -1;
      if (new Date(a.date) < new Date(b.date)) return 1;
      return 0;
    });
    const graphIncomes = [];
    const graphDays = [];
    const days = new Set();
    for (const cost of items) {
      days.add(new Date(cost.date).getUTCDate());
    }
    for (const day of days) {
      let sum = 0;
      for (const cost of items) {
        const day2 = new Date(cost.date).getUTCDate();
        if (day === day2) sum += cost.amount;
      }
      graphIncomes.push(sum);
      graphDays.push(day);
    }
    graphIncomes.reverse();
    graphDays.reverse();
    return {
      days: graphDays,
      items: graphIncomes,
    };
  }

  normalizeIncomes(incomes) {
    if (incomes.length > 0) {
      const items = [];
      const periods = new Set();
      incomes.map((item) => {
        periods.add(item.date.toString());
      });
      let gainByPeriod = 0;

      for (const period of periods) {
        const item = incomes.filter((item) => item.date.toString() === period);
        let gainByDay = 0;
        for (const i of item) {
          gainByDay += i.amount;
          gainByPeriod += i.amount;
        }
        items.push({ period, items: item, gainByDay, gainByPeriod });
      }
      return items.sort((a, b) => {
        if (new Date(a.period) > new Date(b.period)) return -1;
        if (new Date(a.period) < new Date(b.period)) return 1;
        return 0;
      });
    } else {
      return incomes;
    }
  }
}
