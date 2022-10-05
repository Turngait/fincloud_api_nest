import { Controller, Post, Delete, Body, Headers } from '@nestjs/common';
import { ICost } from 'src/interfaces/common';
import { CostsService } from './costs.service';

@Controller('costs')
export class CostsController {
  constructor(private readonly costService: CostsService) {}

  @Post()
  async addCost(@Body() dto: { cost: ICost }, @Headers() headers: any) {
    return await this.costService.addCost(dto.cost, headers.userId);
  }

  @Delete()
  async deleteCost(@Body() dto: { costId: number }) {
    return await this.costService.deleteCost(dto.costId);
  }
}
