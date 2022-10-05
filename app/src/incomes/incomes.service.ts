import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
