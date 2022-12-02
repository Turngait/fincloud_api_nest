import {
  Controller,
  Post,
  Delete,
  Body,
  Headers,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
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

  @UsePipes(new ValidationPipe())
  @Post()
  async addCost(
    @Body() dto: { cost: CostDTO },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const addedCost = await this.costService.addCost(dto.cost, headers.userId);
    response.status(addedCost.status);
    return await this.changeBalances(
      dto.cost,
      addedCost.status,
      TypeOfOps.DECREASE,
    );
  }

  @UsePipes(new ValidationPipe())
  @Delete()
  async deleteCost(
    @Body() dto: { cost: CostDTO },
    @Res({ passthrough: true }) response: any,
  ) {
    const resultCost = await this.costService.deleteCost(dto.cost.id);
    response.status(resultCost.status);
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
    try {
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
              cost,
              balance: changedAcc.data.balance,
              msg: '',
            },
          };
        }
      }
      return {
        status: 500,
        data: {
          cost: null,
          balance: null,
          msg: changedAcc ? changedAcc.data.msg : '',
        },
      };
    } catch (err) {
      return {
        status: 500,
        data: {
          cost: null,
          balance: null,
          msg: err,
        },
      };
    }
  }
}
