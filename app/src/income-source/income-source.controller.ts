import { Controller, Delete, Patch, Post } from '@nestjs/common';
import { IncomeSourceService } from './income-source.service';

@Controller('income-source')
export class IncomeSourceController {
  constructor(private readonly incomeSourceService: IncomeSourceService) {}

  @Post()
  async addIncomeSource() {
    return 'Add cost';
  }

  @Patch()
  async updateIncomeSource() {
    return 'Delete cost';
  }

  @Delete()
  async deleteIncomeSource() {
    return 'Delete cost';
  }
}
