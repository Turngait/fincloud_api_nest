import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class UserTokens {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'text', nullable: true })
  token: string;

  @Column({ type: 'datetime' })
  created_at: Date;
}
