import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ITarget } from 'src/interfaces/common';
import log, { LogLevels } from 'src/logger';
import { dateToday } from 'src/utils/date';
import TargetEntity from './targets.entity';

@Injectable()
export class TargetsService {
  constructor(
    @InjectRepository(TargetEntity)
    private targetsRepository: Repository<TargetEntity>,
  ) {}

  async getAllTargetsForAccount(account_id: number): Promise<any> {
    try {
      const targets = await this.targetsRepository.findBy({ account_id });
      return { status: 200, data: { targets, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From target service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { target: null, msg: err } };
    }
  }

  async addTarget(
    target: ITarget,
    userId: number,
  ): Promise<{
    status: number;
    data: { target: TargetEntity | null; msg: string };
  }> {
    if (!(await this.isTargetExist(target.account_id, target.type))) {
      return {
        status: 400,
        data: { target: null, msg: 'Target already exist' },
      };
    }
    const newTarget = this.createTargetEntity(target, userId);
    try {
      await this.targetsRepository.save(newTarget);
      return { status: 202, data: { target: newTarget, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From target service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { target: null, msg: err } };
    }
  }

  async isTargetExist(account_id: number, type: string): Promise<boolean> {
    const targets = await this.targetsRepository.findBy({
      account_id,
      type,
    });
    return !!targets.length;
  }

  createTargetEntity(target: ITarget, userId: number): TargetEntity {
    const newTarget = new TargetEntity();
    newTarget.amount = target.amount;
    newTarget.account_id = target.account_id;
    newTarget.created_at = dateToday();
    newTarget.group_id = target.group_id;
    newTarget.type = target.type;
    newTarget.user_id = userId;
    return newTarget;
  }
}
