import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import IncomeSourceEntity from './income-source.entity';

@Injectable()
export class IncomeSourceService {
  constructor(
    @InjectRepository(IncomeSourceEntity)
    private incomeSourceRepository: Repository<IncomeSourceEntity>,
  ) {}
}
