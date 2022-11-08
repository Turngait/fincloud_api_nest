import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeSourceController } from './income-source.controller';
import { IncomeSourceService } from './income-source.service';

import IncomeSourceEntity from './income-source.entity';
import IncomeEntity from '../incomes/incomes.entity';
import { IncomesService } from 'src/incomes/incomes.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeSourceEntity, IncomeEntity])],
  controllers: [IncomeSourceController],
  providers: [IncomeSourceService, IncomesService],
  exports: [TypeOrmModule, IncomeSourceService],
})
export class IncomeSourceModule {}
