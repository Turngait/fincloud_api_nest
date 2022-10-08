import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class UserInfo {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('bigint')
  user_id: number;

  @Column('text')
  local: string;
}
