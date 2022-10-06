import { Controller, Delete, Post, Headers, Body } from '@nestjs/common';
import { IIncome } from 'src/interfaces/common';
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
  async addIncome(@Body() dto: { income: IIncome }, @Headers() headers: any) {
    return await this.incomesService.addIncome(dto.income, headers.userId);
  }

  @Delete()
  async deleteIncome(@Body() dto: { incomeId: number }) {
    return await this.incomesService.deleteIncome(dto.incomeId);
  }
}
