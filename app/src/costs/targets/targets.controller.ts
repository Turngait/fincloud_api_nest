import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Headers,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { TargetDTO } from './targets.dto';
import { TargetsService } from './targets.service';

@Controller('targets')
export class TargetsController {
  constructor(private readonly targetsService: TargetsService) {}

  @Get()
  async getTargetsByAccountId(
    @Body() dto: { accountId: number },
    @Res({ passthrough: true }) response: any,
  ) {
    const data = await this.targetsService.getAllTargetsForAccount(
      dto.accountId,
    );
    response.status(data.status);
    return data;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async addTarget(
    @Body() dto: { target: TargetDTO },
    @Headers() header: any,
    @Res({ passthrough: true }) response: any,
  ): Promise<any> {
    const data = await this.targetsService.addTarget(dto.target, header.userId);
    response.status(data.status);
    return data;
  }

  @Delete()
  async deleteTarget(
    @Body() dto: { id: number },
    @Res({ passthrough: true }) response: any,
  ) {
    const data = await this.targetsService.deleteTarget(dto.id);
    response.status(data.status);
    return data;
  }

  @UsePipes(new ValidationPipe())
  @Put()
  async editTarget(
    @Body() dto: { target: TargetDTO },
    @Headers() header: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const data = await this.targetsService.editTarget(
      dto.target,
      header.userId,
    );
    response.status(data.status);
    return data;
  }
}
