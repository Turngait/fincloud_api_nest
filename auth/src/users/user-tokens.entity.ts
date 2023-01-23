import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class UserTokens {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column('text')
  token: string;

  @Column({ type: 'datetime' })
  created_at: Date;
}
