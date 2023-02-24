import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TargetsController } from './targets.controller';
import { TargetsService } from './targets.service';
import TargetEntity from './targets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TargetEntity])],
  controllers: [TargetsController],
  providers: [TargetsService],
})
export class TargetsModule {}
