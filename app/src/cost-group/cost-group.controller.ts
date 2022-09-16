import { Controller, Delete, Patch, Post } from '@nestjs/common';
import { CostGroupService } from './cost-group.service';

@Controller('cost-group')
export class CostGroupController {
  constructor(private readonly costGroupService: CostGroupService) {}

  @Post()
  async addCostGroup() {
    return 'Add cost';
  }

  @Patch()
  async updateCostGroup() {
    return 'Delete cost';
  }

  @Delete()
  async deleteCostGroup() {
    return 'Delete cost';
  }
}
