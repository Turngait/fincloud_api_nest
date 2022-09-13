import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostsController } from './costs.controller';
import { CostsService } from './costs.service';

import { Cost } from './costs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cost])],
  controllers: [CostsController],
  providers: [CostsService],
  exports: [TypeOrmModule],
})
export class CostsModule {}
