import {
  Controller,
  Delete,
  Post,
  Headers,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { BudgetsService } from 'src/budgets/budgets.service';
import { IIncome, TypeOfOps } from 'src/interfaces/common';
import { IncomeDTO } from './incomes.dto';
import { IncomesService } from './incomes.service';

@Controller('incomes')
export class IncomesController {
  constructor(
    private readonly incomesService: IncomesService,
    private readonly accountService: AccountsService,
    private readonly budgetsService: BudgetsService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async addIncome(
    @Body() dto: { income: IncomeDTO },
    @Headers() headers: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const addedIncome = await this.incomesService.addIncome(
      dto.income,
      headers.userId,
    );
    response.status(addedIncome.status);
    return await this.changeBalances(
      dto.income,
      addedIncome.status,
      TypeOfOps.INCREASE,
    );
  }

  @UsePipes(new ValidationPipe())
  @Delete()
  async deleteIncome(
    @Body() dto: { income: IncomeDTO },
    @Res({ passthrough: true }) response: any,
  ) {
    const resultIncome = await this.incomesService.deleteIncome(dto.income.id);
    response.status(resultIncome.status);
    return await this.changeBalances(
      dto.income,
      resultIncome.status,
      TypeOfOps.DECREASE,
    );
  }

  async changeBalances(
    income: IIncome,
    initStatus: number,
    typeOfOp: TypeOfOps,
  ): Promise<any> {
    let changedAcc = null;
    if (initStatus === 200 || initStatus === 202) {
      changedAcc = await this.accountService.changeBalance(
        income.account_id,
        +income.amount,
        typeOfOp,
      );
      if (changedAcc && changedAcc.status === 200) {
        await this.budgetsService.changeBalance(
          income.budget_id,
          +income.amount,
          typeOfOp,
        );
        return {
          status: initStatus,
          data: {
            income,
            balance: changedAcc.data.balance,
            msg: '',
          },
        };
      }
    }
    return {
      status: 500,
      data: {
        income: null,
        balance: null,
        msg: changedAcc.data.msg,
      },
    };
  }
}
