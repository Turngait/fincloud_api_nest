import { Controller, Post, Delete, Body, Headers } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { CostDTO } from './costs.dto';
import { CostsService } from './costs.service';

@Controller('costs')
export class CostsController {
  constructor(
    private readonly costService: CostsService,
    private readonly accountService: AccountsService,
  ) {}

  @Post()
  async addCost(@Body() dto: { cost: CostDTO }, @Headers() headers: any) {
    const addedCost = await this.costService.addCost(dto.cost, headers.userId);
    let changedAcc = null;
    if (addedCost.status === 202) {
      changedAcc = await this.accountService.decreesBalance(
        dto.cost.account_id,
        dto.cost.amount,
      );
      if (changedAcc && changedAcc.status === 200) {
        return {
          status: 202,
          data: { cost: addedCost.data.cost, balance: changedAcc.data.balance },
        };
      }
    }
    return {
      status: 500,
      data: {
        cost: null,
        balance: null,
        msg: [addedCost.data.msg, changedAcc.data.msg],
      },
    };
  }

  @Delete()
  async deleteCost(@Body() dto: { costId: number }) {
    return await this.costService.deleteCost(dto.costId);
  }
}
