import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CostGroupEntity from './cost-group.entity';

@Injectable()
export class CostGroupService {
  constructor(
    @InjectRepository(CostGroupEntity)
    private costsGroupRepository: Repository<CostGroupEntity>,
  ) {}
}
