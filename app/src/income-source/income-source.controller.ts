import { Body, Controller, Delete, Headers, Patch, Post } from '@nestjs/common';
import { IncomeSourceDTO } from './income-source.dto';
import { IncomeSourceService } from './income-source.service';

@Controller('income-source')
export class IncomeSourceController {
  constructor(private readonly incomeSourceService: IncomeSourceService) {}

  @Post()
  async addIncomeSource(
    @Body() dto: { IncomeSource: IncomeSourceDTO },
    @Headers() headers: any,
  ) {
    return this.incomeSourceService.addSource(
      dto.IncomeSource.title,
      dto.IncomeSource.description,
      headers.userId,
      dto.IncomeSource.account_id,
      dto.IncomeSource.order || 0,
    );
  }

  @Patch()
  async updateIncomeSource(@Body() dto: { source: IncomeSourceDTO }) {
    return await this.incomeSourceService.updateIncomeSource(dto.source);
  }

  @Delete()
  async deleteIncomeSource(@Body() dto: { incomeSourceId: number }) {
    return this.incomeSourceService.deleteCostsGroup(dto.incomeSourceId);
  }
}
