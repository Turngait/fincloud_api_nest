import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostsController } from './costs.controller';
import { CostsService } from './costs.service';

import CostEntity from './costs.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import AccountEntity from 'src/accounts/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostEntity, AccountEntity])],
  controllers: [CostsController],
  providers: [CostsService, AccountsService],
  exports: [TypeOrmModule, CostsService],
})
export class CostsModule {}
