import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CostEntity from './costs.entity';

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(CostEntity)
    private costsRepository: Repository<CostEntity>,
  ) {}

  async testCost() {
    const cost = new CostEntity();
    cost.amount = 100;
    cost.budget_id = 200;
    cost.date = new Date();
    cost.description = 'ddsds';
    cost.title = 'test';
    cost.year = 2022;
    cost.month = 2;
    cost.user_id = 300;
    cost.group_id = 400;

    try {
      await this.costsRepository.save(cost);
      return 'Done';
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
}
