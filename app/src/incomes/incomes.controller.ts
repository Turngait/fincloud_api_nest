import { Controller, Delete, Get, Post } from '@nestjs/common';
import { IncomesService } from './incomes.service';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Get('test')
  testFunc() {
    return this.incomesService.getTest();
  }

  @Post()
  async addIncome() {
    return 'Add income';
  }

  @Delete()
  async deleteIncome() {
    return 'Delete income';
  }
}
