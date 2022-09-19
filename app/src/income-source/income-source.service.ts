import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dateToday } from 'src/utils/date';
import { Repository } from 'typeorm';

import IncomeSourceEntity from './income-source.entity';

@Injectable()
export class IncomeSourceService {
  constructor(
    @InjectRepository(IncomeSourceEntity)
    private incomeSourceRepository: Repository<IncomeSourceEntity>,
  ) {}

  async addSource(
    title: string,
    desc: string,
    userId: number,
    order = 0,
  ): Promise<{
    status: number;
    source: IncomeSourceEntity | null;
    msg: string;
  }> {
    const source = new IncomeSourceEntity();
    source.title = title;
    source.description = desc;
    source.user_id = userId;
    source.created_at = dateToday();
    source.order = order;

    try {
      await this.incomeSourceRepository.save(source);
      return { status: 202, source: source, msg: '' };
    } catch (err) {
      console.log();
      return { status: 500, source: null, msg: err };
    }
  }
}
