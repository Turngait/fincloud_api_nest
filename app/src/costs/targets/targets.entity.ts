import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Targets {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @Column()
  type: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'bigint', nullable: true })
  group_id: number;

  @Column({ type: 'bigint', nullable: false })
  user_id: number;

  @Column({ type: 'bigint', nullable: false })
  account_id: number;
}
