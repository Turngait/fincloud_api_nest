import {
  Body,
  Controller,
  Delete,
  Post,
  Headers,
  UsePipes,
  ValidationPipe,
  Put,
  Res,
} from '@nestjs/common';
import { BudgetDTO } from './budgets.dto';
import { BudgetsService } from './budgets.service';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetService: BudgetsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async addBudget(
    @Body() dto: { budget: BudgetDTO },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.budgetService.addBudget(
      headers.userId,
      dto.budget.title,
      dto.budget.description,
      dto.budget.is_calculating,
      dto.budget.account_id,
    );

    response.status(result.status);
    return result;
  }

  @UsePipes(new ValidationPipe())
  @Put()
  async updateBudget(
    @Body() dto: { budget: BudgetDTO },
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.budgetService.editBudget(dto.budget);
    response.status(result.status);
    return result;
  }

  @Delete()
  async deleteBudget(
    @Body() dto: { budgetId: number },
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.budgetService.deleteBudget(dto.budgetId);
    response.status(result.status);
    return result;
  }
}
