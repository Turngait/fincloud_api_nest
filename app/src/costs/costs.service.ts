import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICost } from 'src/interfaces/common';
import { Repository } from 'typeorm';

import CostEntity from './costs.entity';

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
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }

  async getCostsByPeriod(
    period: string,
    userId: number,
    accountID: number,
  ): Promise<any> {
    try {
      const costs = await this.costsRepository.findBy({
        period,
        user_id: userId,
        account_id: accountID,
      });
      const graphData = this.addGraphData(costs);
      return { costs, graphData, msg: '' };
    } catch (err) {
      console.log(err);
      return { costs: null, msg: err };
    }
  }

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
      days: graphDays,
      costs: graphCosts,
    };
  }
}
