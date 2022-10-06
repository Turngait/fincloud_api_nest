import { Body, Controller, Delete, Patch, Post, Headers } from '@nestjs/common';
import { ICostGroup } from 'src/interfaces/common';
import { CostGroupService } from './cost-group.service';

@Controller('cost-group')
export class CostGroupController {
  constructor(private readonly costGroupService: CostGroupService) {}

  @Post()
  async addCostGroup(
    @Body() dto: { costGroup: ICostGroup },
    @Headers() headers: any,
  ) {
    return await this.costGroupService.addGroup(
      dto.costGroup.title,
      dto.costGroup.description,
      headers.userId,
      dto.costGroup.order || 0,
    );
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
