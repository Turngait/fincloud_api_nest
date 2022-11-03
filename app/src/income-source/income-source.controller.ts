import {
  Body,
  Controller,
  Delete,
  Headers,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IncomeSourceDTO } from './income-source.dto';
import { IncomeSourceService } from './income-source.service';

@Controller('income-source')
export class IncomeSourceController {
  constructor(private readonly incomeSourceService: IncomeSourceService) {}

  @UsePipes(new ValidationPipe())
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

  @UsePipes(new ValidationPipe())
  @Put()
  async updateIncomeSource(@Body() dto: { source: IncomeSourceDTO }) {
    return await this.incomeSourceService.updateIncomeSource(dto.source);
  }

  @Delete()
  async deleteIncomeSource(@Body() dto: { incomeSourceId: number }) {
    return await this.incomeSourceService.deleteIncomeSource(
      dto.incomeSourceId,
    );
  }
}
