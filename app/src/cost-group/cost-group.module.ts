import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostGroupController } from './cost-group.controller';
import { CostGroupService } from './cost-group.service';

import CostGroupEntity from './cost-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostGroupEntity])],
  controllers: [CostGroupController],
  providers: [CostGroupService],
  exports: [TypeOrmModule, CostGroupService],
})
export class CostGroupModule {}
