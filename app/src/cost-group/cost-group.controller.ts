import {
  Body,
  Controller,
  Delete,
  Put,
  Post,
  Headers,
  UsePipes,
  ValidationPipe,
  Res,
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
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.costGroupService.addGroup(
      dto.costGroup.title,
      dto.costGroup.description,
      headers.userId,
      dto.costGroup.account_id,
      dto.costGroup.order || 0,
    );
    response.status(result.status);
    return result;
  }

  @UsePipes(new ValidationPipe())
  @Put()
  async updateCostGroup(
    @Body() dto: { costGroup: CostGroupDTO },
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.costGroupService.updateCostGroup(dto.costGroup);
    response.status(result.status);
    return result;
  }

  @Delete()
  async deleteCostGroup(
    @Body() dto: { costGroupId: number },
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.costGroupService.deleteCostsGroup(
      dto.costGroupId,
    );

    response.status(result.status);
    return result;
  }
}
