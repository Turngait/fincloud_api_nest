import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dateToday } from 'src/utils/date';
import { Repository } from 'typeorm';

import CostGroupEntity from './cost-group.entity';

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
    order = 0,
  ): Promise<{ status: number; group: CostGroupEntity | null; msg: string }> {
    const group = new CostGroupEntity();
    group.created_at = dateToday();
    group.description = desc;
    group.title = title;
    group.order = order;
    group.user_id = userId;

    try {
      await this.costsGroupRepository.save(group);
      return { status: 202, group, msg: '' };
    } catch (err) {
      console.log(err);
      return { status: 500, group: null, msg: err };
    }
  }

  async getCostsGroups(userId: number): Promise<any> {
    try {
      const groups = await this.costsGroupRepository.findBy({
        user_id: userId,
      });
      return { groups, msg: '' };
    } catch (err) {
      console.log(err);
      return { groups: null, msg: err };
    }
  }

  async deleteCostsGroup(
    costGroupID: number,
  ): Promise<{ status: number; data: { isDeleted: boolean; msg: string } }> {
    try {
      await this.costsGroupRepository.delete(costGroupID);
      return { status: 200, data: { isDeleted: false, msg: '' } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }
}
