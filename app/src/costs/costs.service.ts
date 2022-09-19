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
    newCost.period = cost.year + '-' + String(cost.month).padStart(2, '0');

    try {
      await this.costsRepository.save(newCost);
      return { status: 202, data: { cost: newCost, msg: '' } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: { cost: null, msg: err } };
    }
  }
}
