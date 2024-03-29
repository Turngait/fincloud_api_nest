import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Budget {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column('bigint')
  user_id: number;

  @Column({ type: 'real' })
  balance: number;

  @Column()
  is_calculated: boolean;

  @Column('bigint')
  account_id: number;
}
