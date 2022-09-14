import { Controller, Get } from '@nestjs/common';
import { CostsService } from './costs.service';

@Controller('costs')
export class CostsController {
  constructor(private readonly costService: CostsService) {}

  @Get('/test')
  async getTest() {
    return await this.costService.testCost();
  }
}
