import { Controller, Delete, Patch, Post } from '@nestjs/common';
import { BudgetsService } from './budgets.service';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetService: BudgetsService) {}

  @Post()
  async addBudget() {
    return 'Add budget';
  }

  @Patch()
  async updateBudget() {
    return 'Update budget';
  }

  @Delete()
  async deleteBudget() {
    return 'Delete budget';
  }
}
