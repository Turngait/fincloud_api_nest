import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';

import IncomeEntity from './incomes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeEntity])],
  controllers: [IncomesController],
  providers: [IncomesService],
  exports: [TypeOrmModule, IncomesService],
})
export class IncomesModule {}
