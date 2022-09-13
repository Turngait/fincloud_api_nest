import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cost } from './costs.entity';

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(Cost)
    private costsRepository: Repository<Cost>,
  ) {}

  async testCost() {
    const cost = new Cost();
    cost.amount = 100;
    cost.budget_id = 200;
    cost.date = new Date();
    cost.description = 'ddsds';
    cost.title = 'test';
    cost.period = 'ssss';
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
