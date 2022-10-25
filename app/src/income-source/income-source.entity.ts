import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class IncomeSource {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  order: number;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column('bigint')
  user_id: number;

  @Column('bigint')
  account_id: number;
}
