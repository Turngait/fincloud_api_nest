import { Controller, Post, Delete, Body, Headers } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { BudgetsService } from 'src/budgets/budgets.service';
import { ICost, TypeOfOps } from 'src/interfaces/common';
import { CostDTO } from './costs.dto';
import { CostsService } from './costs.service';

@Controller('costs')
export class CostsController {
  constructor(
    private readonly costService: CostsService,
    private readonly accountService: AccountsService,
    private readonly budgetsService: BudgetsService,
  ) {}

  @Post()
  async addCost(@Body() dto: { cost: CostDTO }, @Headers() headers: any) {
    const addedCost = await this.costService.addCost(dto.cost, headers.userId);
    return await this.changeBalances(
      dto.cost,
      addedCost.status,
      TypeOfOps.DECREASE,
    );
  }

  @Delete()
  async deleteCost(@Body() dto: { cost: CostDTO }) {
    const resultCost = await this.costService.deleteCost(dto.cost.id);
    return await this.changeBalances(
      dto.cost,
      resultCost.status,
      TypeOfOps.INCREASE,
    );
  }

  async changeBalances(
    cost: ICost,
    initStatus: number,
    typeOfOp: TypeOfOps,
  ): Promise<any> {
    let changedAcc = null;
    if (initStatus === 200 || initStatus === 202) {
      changedAcc = await this.accountService.changeBalance(
        cost.account_id,
        cost.amount,
        typeOfOp,
      );
      if (changedAcc && changedAcc.status === 200) {
        await this.budgetsService.changeBalance(
          cost.budget_id,
          cost.amount,
          typeOfOp,
        );
        return {
          status: initStatus,
          data: {
            isDeleted: true,
            balance: changedAcc.data.balance,
          },
        };
      }
    }
    return {
      status: 500,
      data: {
        cost: null,
        balance: null,
        msg: changedAcc.data.msg,
      },
    };
  }
}
