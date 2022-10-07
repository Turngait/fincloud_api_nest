import { Body, Controller, Delete, Headers, Patch, Post } from '@nestjs/common';
import { IIncomeSources } from 'src/interfaces/common';
import { IncomeSourceService } from './income-source.service';

@Controller('income-source')
export class IncomeSourceController {
  constructor(private readonly incomeSourceService: IncomeSourceService) {}

  @Post()
  async addIncomeSource(
    @Body() dto: { IncomeSource: IIncomeSources },
    @Headers() headers: any,
  ) {
    return this.incomeSourceService.addSource(
      dto.IncomeSource.title,
      dto.IncomeSource.description,
      headers.userId,
      dto.IncomeSource.order || 0,
    );
  }

  @Patch()
  async updateIncomeSource() {
    return 'Delete cost';
  }

  @Delete()
  async deleteIncomeSource(@Body() dto: { incomeSourceId: number }) {
    return this.incomeSourceService.deleteCostsGroup(dto.incomeSourceId);
  }
}
