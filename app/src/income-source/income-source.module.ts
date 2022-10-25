import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeSourceController } from './income-source.controller';
import { IncomeSourceService } from './income-source.service';

import IncomeSourceEntity from './income-source.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeSourceEntity])],
  controllers: [IncomeSourceController],
  providers: [IncomeSourceService],
  exports: [TypeOrmModule, IncomeSourceService],
})
export class IncomeSourceModule {}
