import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IIncomeSources } from 'src/interfaces/common';
import { dateToday } from 'src/utils/date';
import { Repository } from 'typeorm';

import IncomeSourceEntity from './income-source.entity';

@Injectable()
export class IncomeSourceService {
  constructor(
    @InjectRepository(IncomeSourceEntity)
    private incomeSourceRepository: Repository<IncomeSourceEntity>,
  ) {}

  async addSource(
    title: string,
    desc: string,
    userId: number,
    account_id: number,
    order = 0,
  ): Promise<{
    status: number;
    source: IncomeSourceEntity | null;
    msg: string;
  }> {
    const source = new IncomeSourceEntity();
    source.title = title;
    source.description = desc;
    source.user_id = userId;
    source.created_at = dateToday();
    source.order = order;
    source.account_id = account_id;

    try {
      await this.incomeSourceRepository.save(source);
      return { status: 202, source: source, msg: '' };
    } catch (err) {
      console.log();
      return { status: 500, source: null, msg: err };
    }
  }

  async getIncomesSources(userId: number, accountID: number): Promise<any> {
    try {
      const sources = await this.incomeSourceRepository.findBy({
        user_id: userId,
        account_id: accountID,
      });
      return { sources, msg: '' };
    } catch (err) {
      console.log(err);
      return { sources: null, msg: err };
    }
  }

  async deleteCostsGroup(
    incomeSourceID: number,
  ): Promise<{ status: number; data: { isDeleted: boolean; msg: string } }> {
    try {
      await this.incomeSourceRepository.delete(incomeSourceID);
      return { status: 200, data: { isDeleted: true, msg: '' } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: { isDeleted: false, msg: err } };
    }
  }

  async updateIncomeSource(newSource: IIncomeSources): Promise<{
    status: number;
    data: { isUpdated: boolean; msg: string };
  }> {
    try {
      const { incomeSource } = await this.getIncomeSourceByID(newSource.id);
      if (!incomeSource) throw new NotFoundException();
      incomeSource.title = newSource.title;
      incomeSource.description = newSource.description;
      incomeSource.order = newSource.order;
      await this.incomeSourceRepository.save(incomeSource);

      return { status: 200, data: { isUpdated: true, msg: '' } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: { isUpdated: false, msg: err } };
    }
  }

  async getIncomeSourceByID(
    id: number,
  ): Promise<{ incomeSource: IncomeSourceEntity; msg: string }> {
    try {
      const source = await this.incomeSourceRepository.findOneBy({ id });
      return { incomeSource: source, msg: '' };
    } catch (err) {
      console.log(err);
      return { incomeSource: null, msg: err };
    }
  }
}
