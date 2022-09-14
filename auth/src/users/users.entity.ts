import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  pass: string;

  @Column('text')
  token: string;

  @Column('text')
  paper: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column()
  balance: number;
}
