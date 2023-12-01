import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Income {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column()
  period: string;

  @Column('text')
  description: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column('bigint')
  source_id: number;

  @Column('bigint')
  budget_id: number;

  @Column('bigint')
  user_id: number;

  @Column('bigint')
  account_id: number;

  @Column({ type: 'real' })
  amount: number;
}
