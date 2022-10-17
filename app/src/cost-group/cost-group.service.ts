import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dateToday } from 'src/utils/date';
import { Repository } from 'typeorm';

import CostGroupEntity from './cost-group.entity';
import { ICostGroup } from 'src/interfaces/common';
import log, { LogLevels } from 'src/logger';

@Injectable()
export class CostGroupService {
  constructor(
    @InjectRepository(CostGroupEntity)
    private costsGroupRepository: Repository<CostGroupEntity>,
  ) {}

  async addGroup(
    title: string,
    desc: string,
    userId: number,
    account_id: number,
    order = 0,
  ): Promise<{ status: number; group: ICostGroup | null; msg: string }> {
    const group = new CostGroupEntity();
    group.created_at = dateToday();
    group.description = desc;
    group.title = title;
    group.order = order;
    group.user_id = userId;
    group.account_id = account_id;

    try {
      await this.costsGroupRepository.save(group);
      return { status: 202, group, msg: '' };
    } catch (err) {
      console.log(err);
      log(`From costGroup service: ${err}`, LogLevels.ERROR);
      return { status: 500, group: null, msg: err };
    }
  }

  async getCostsGroups(
    userId: number,
    accountID: number,
  ): Promise<{ groups: CostGroupEntity[] | null; msg: string }> {
    try {
      const groups = await this.costsGroupRepository.findBy({
        user_id: userId,
        account_id: accountID,
      });
      return { groups, msg: '' };
    } catch (err) {
      console.log(err);
      log(`From costGroup service: ${err}`, LogLevels.ERROR);
      return { groups: null, msg: err };
    }
  }

  async deleteCostsGroup(
    costGroupID: number,
  ): Promise<{ status: number; data: { isDeleted: boolean; msg: string } }> {
    try {
      await this.costsGroupRepository.delete(costGroupID);
      return { status: 200, data: { isDeleted: true, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From costGroup service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }

  async updateCostGroup(newGroup: ICostGroup): Promise<{
    status: number;
    data: { isUpdated: boolean; msg: string };
  }> {
    try {
      const { costGroup } = await this.getCostGroupByID(newGroup.id);
      if (!costGroup) throw new NotFoundException();
      costGroup.title = newGroup.title;
      costGroup.description = newGroup.description;
      costGroup.order = newGroup.order;
      await this.costsGroupRepository.save(costGroup);

      return { status: 200, data: { isUpdated: true, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From costGroup service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { isUpdated: false, msg: err } };
    }
  }

  async getCostGroupByID(
    id: number,
  ): Promise<{ costGroup: CostGroupEntity; msg: string }> {
    try {
      const costGroup = await this.costsGroupRepository.findOneBy({ id });
      return { costGroup, msg: '' };
    } catch (err) {
      console.log(err);
      log(`From costGroup service: ${err}`, LogLevels.ERROR);
      return { costGroup: null, msg: err };
    }
  }
}
