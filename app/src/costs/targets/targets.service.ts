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

  async getAllTargetsForAccount(account_id: number): Promise<{
    status: number;
    data: {
      targets: {
        day: TargetEntity[];
        month: TargetEntity[];
      } | null;
      msg: string;
    };
  }> {
    try {
      const targets = await this.targetsRepository.findBy({ account_id });
      return {
        status: 200,
        data: { targets: this.normalizeTargets(targets), msg: '' },
      };
    } catch (err) {
      console.log(err);
      log(`From target service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { targets: null, msg: err } };
    }
  }

  async addTarget(
    target: ITarget,
    userId: number,
  ): Promise<{
    status: number;
    data: { target: TargetEntity | null; msg: string };
  }> {
    if (
      await this.isTargetExist(target.account_id, target.type, target.group_id)
    ) {
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

  async editTarget(
    target: ITarget,
    user_id: number,
  ): Promise<{
    status: number;
    data: { target: TargetEntity | null; msg: string };
  }> {
    try {
      const editableTarget = await this.targetsRepository.findOneBy({
        user_id,
        id: target.id,
      });
      if (!editableTarget) {
        return {
          status: 400,
          data: { target: null, msg: 'Target already exist' },
        };
      }

      editableTarget.amount = target.amount;
      await this.targetsRepository.save(editableTarget);
      return { status: 202, data: { target: editableTarget, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From target service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { target: null, msg: err } };
    }
  }

  async deleteTarget(
    id: number,
  ): Promise<{ status: number; data: { isDeleted: boolean; msg: string } }> {
    try {
      await this.targetsRepository.delete(id);
      return { status: 202, data: { isDeleted: true, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From target service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }

  async isTargetExist(
    account_id: number,
    type: string,
    group_id: number,
  ): Promise<boolean> {
    const targets = await this.targetsRepository.findBy({
      account_id,
      type,
      group_id,
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

  normalizeTargets(targets: TargetEntity[] | null): {
    day: TargetEntity[];
    month: TargetEntity[];
  } | null {
    if (!targets) return null;
    const monthlyTargets = targets.filter((target) => target.type === 'month');
    const dailyTargets = targets.filter((target) => target.type === 'day');
    return {
      day: dailyTargets,
      month: monthlyTargets,
    };
  }

  // In progress
  calculateMonthlyTargets(targets: TargetEntity[], costs: any): any {
    const monthlyTargets = targets.filter((target) => target.type === 'month');
    // console.log(monthlyTargets);
    const onlyCosts = [];
    const sumOfGroups = [];
    for (const day of costs) {
      onlyCosts.push(...day.items);
    }

    for (const target of monthlyTargets) {
      const group = {
        group_id: +target.group_id,
        sum: 0,
      };

      for (const cost of onlyCosts) {
        if (group.group_id === +cost.group_id) group.sum += cost.amount;
      }
      console.log(target.amount);
      sumOfGroups.push(group);
    }

    console.log(sumOfGroups);
  }
}
