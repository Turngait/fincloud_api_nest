import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cost {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  period: string;

  @Column('text')
  description: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column('bigint')
  group_id: number;

  @Column('bigint')
  budget_id: number;

  @Column('bigint')
  user_id: number;

  @Column()
  amount: number;
}
