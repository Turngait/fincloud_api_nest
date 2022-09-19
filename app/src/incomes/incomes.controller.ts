import { Controller, Delete, Post, Headers } from '@nestjs/common';
import { IncomesService } from './incomes.service';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post('test')
  testFunc(@Headers() headers: any) {
    console.log(headers);
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
