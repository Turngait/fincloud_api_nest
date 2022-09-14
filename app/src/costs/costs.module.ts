import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostsController } from './costs.controller';
import { CostsService } from './costs.service';

import CostEntity from './costs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostEntity])],
  controllers: [CostsController],
  providers: [CostsService],
  exports: [TypeOrmModule],
})
export class CostsModule {}
