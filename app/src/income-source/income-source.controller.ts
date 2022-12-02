import {
  Body,
  Controller,
  Delete,
  Headers,
  Post,
  Put,
  Res,
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
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.incomeSourceService.addSource(
      dto.IncomeSource.title,
      dto.IncomeSource.description,
      headers.userId,
      dto.IncomeSource.account_id,
      dto.IncomeSource.order || 0,
    );
    response.status(result.status);
    return result;
  }

  @UsePipes(new ValidationPipe())
  @Put()
  async updateIncomeSource(
    @Body() dto: { source: IncomeSourceDTO },
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.incomeSourceService.updateIncomeSource(
      dto.source,
    );
    response.status(result.status);
    return result;
  }

  @Delete()
  async deleteIncomeSource(
    @Body() dto: { incomeSourceId: number },
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.incomeSourceService.deleteIncomeSource(
      dto.incomeSourceId,
    );
    response.status(result.status);
    return result;
  }
}
