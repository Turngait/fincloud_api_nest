import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostGroupController } from './cost-group.controller';
import { CostGroupService } from './cost-group.service';

import CostGroupEntity from './cost-group.entity';
import CostEntity from '../costs/costs.entity';
import { CostsService } from 'src/costs/costs.service';

@Module({
  imports: [TypeOrmModule.forFeature([CostGroupEntity, CostEntity])],
  controllers: [CostGroupController],
  providers: [CostGroupService, CostsService],
  exports: [TypeOrmModule, CostGroupService],
})
export class CostGroupModule {}
