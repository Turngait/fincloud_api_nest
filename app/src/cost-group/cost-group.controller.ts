import {
  Body,
  Controller,
  Delete,
  Put,
  Post,
  Headers,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CostGroupDTO } from './cost-group.dto';
import { CostGroupService } from './cost-group.service';

@Controller('cost-group')
export class CostGroupController {
  constructor(private readonly costGroupService: CostGroupService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async addCostGroup(
    @Body() dto: { costGroup: CostGroupDTO },
    @Headers() headers: any,
  ) {
    return await this.costGroupService.addGroup(
      dto.costGroup.title,
      dto.costGroup.description,
      headers.userId,
      dto.costGroup.account_id,
      dto.costGroup.order || 0,
    );
  }

  @UsePipes(new ValidationPipe())
  @Put()
  async updateCostGroup(@Body() dto: { costGroup: CostGroupDTO }) {
    return await this.costGroupService.updateCostGroup(dto.costGroup);
  }

  @Delete()
  async deleteCostGroup(@Body() dto: { costGroupId: number }) {
    return await this.costGroupService.deleteCostsGroup(dto.costGroupId);
  }
}
