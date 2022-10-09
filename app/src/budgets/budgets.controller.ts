import { Body, Controller, Delete, Patch, Post, Headers } from '@nestjs/common';
import { BudgetDTO } from './budgets.dto';
import { BudgetsService } from './budgets.service';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetService: BudgetsService) {}

  @Post()
  async addBudget(@Body() dto: { budget: BudgetDTO }, @Headers() headers: any) {
    return await this.budgetService.addBudget(
      headers.userId,
      dto.budget.title,
      dto.budget.balance,
      dto.budget.description,
      dto.budget.is_calculating,
      dto.budget.account_id,
    );
  }

  @Patch()
  async updateBudget(@Body() dto: { budget: BudgetDTO }) {
    return await this.budgetService.editBudget(dto.budget);
  }

  @Delete()
  async deleteBudget(@Body() dto: { budgetId: number }) {
    return await this.budgetService.deleteBudget(dto.budgetId);
  }
}
