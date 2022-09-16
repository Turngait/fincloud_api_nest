import { Controller, Post, Delete } from '@nestjs/common';
import { CostsService } from './costs.service';

@Controller('costs')
export class CostsController {
  constructor(private readonly costService: CostsService) {}

  @Post()
  async addCost() {
    return 'Add cost';
  }

  @Delete()
  async deleteCost() {
    return 'Delete cost';
  }
}
