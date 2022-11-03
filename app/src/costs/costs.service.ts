import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICost } from 'src/interfaces/common';
import { Repository } from 'typeorm';

import CostEntity from './costs.entity';
import log, { LogLevels } from 'src/logger';

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(CostEntity)
    private costsRepository: Repository<CostEntity>,
  ) {}

  async addCost(
    cost: ICost,
    userId: number,
  ): Promise<{
    status: number;
    data: { cost: CostEntity | null; msg: string };
  }> {
    const newCost = new CostEntity();
    newCost.amount = cost.amount;
    newCost.budget_id = cost.budget_id;
    newCost.date = new Date(cost.date);
    newCost.description = cost.description;
    newCost.title = cost.title;
    newCost.year = cost.year;
    newCost.month = cost.month;
    newCost.user_id = userId;
    newCost.group_id = cost.group_id;
    newCost.account_id = cost.account_id;
    newCost.period = cost.year + '-' + String(cost.month).padStart(2, '0');

    try {
      await this.costsRepository.save(newCost);
      return { status: 202, data: { cost: newCost, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From cost service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { cost: null, msg: err } };
    }
  }

  async deleteCost(costId: number): Promise<{
    status: number;
    data: { isDeleted: boolean; msg: string };
  }> {
    try {
      await this.costsRepository.delete(costId);
      return { status: 200, data: { isDeleted: true, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From cost service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }

  // TODO In develop
  async deleteCostByGroupId(group_id: number): Promise<{
    status: number;
    data: { isDeleted: boolean; msg: string; account_id: null | number };
  }> {
    try {
      const costs = await this.costsRepository.findBy({ group_id });
      let account_id = null;
      if (costs && costs.length > 0) {
        account_id = costs[0].account_id;
        await this.costsRepository
          .createQueryBuilder()
          .delete()
          .from('cost')
          .where('group_id=:group_id', { group_id })
          .execute();
      }

      return { status: 200, data: { isDeleted: true, msg: '', account_id } };
    } catch (err) {
      console.log(err);
      log(`From cost service: ${err}`, LogLevels.ERROR);
      return {
        status: 500,
        data: { isDeleted: false, msg: err, account_id: null },
      };
    }
  }

  async getCostsByPeriod(
    period: string,
    userId: number,
    accountID: number,
  ): Promise<{ costs: CostEntity[] | null; graphData: any; msg: string }> {
    try {
      const costs = await this.costsRepository.findBy({
        period,
        user_id: userId,
        account_id: accountID,
      });
      const graphData = this.addGraphData(costs);
      return { costs: this.normalizeCosts(costs), graphData, msg: '' };
    } catch (err) {
      console.log(err);
      log(`From cost service: ${err}`, LogLevels.ERROR);
      return { costs: null, graphData: null, msg: err };
    }
  }

  // TODO Move ti utils
  addGraphData(costs) {
    const graphCosts = [];
    const graphDays = [];
    const days = new Set();
    for (const cost of costs) {
      days.add(new Date(cost.date).getUTCDate());
    }
    for (const day of days) {
      let sum = 0;
      for (const cost of costs) {
        const day2 = new Date(cost.date).getUTCDate();
        if (day === day2) sum += cost.amount;
      }
      graphCosts.push(sum);
      graphDays.push(day);
    }
    graphCosts.reverse();
    graphDays.reverse();
    return {
      days: [1, 2, 3],
      costs: graphCosts,
    };
  }

  normalizeCosts(costs) {
    if (costs.length > 0) {
      const items = [];
      const periods = new Set();
      costs.map((item) => {
        periods.add(item.date.toString());
      });
      let spentByPeriod = 0;
      for (const period of periods) {
        const item = costs.filter((item) => item.date.toString() === period);
        let spentByDay = 0;
        for (const i of item) {
          spentByDay += i.amount;
          spentByPeriod += i.amount;
        }
        items.push({
          period,
          items: item,
          spentByDay,
          spentByThisMonth: spentByPeriod,
        });
      }
      return items.sort((a, b) => {
        if (new Date(a.period) > new Date(b.period)) return -1;
        if (new Date(a.period) < new Date(b.period)) return 1;
        return 0;
      });
    } else {
      return costs;
    }
  }
}
