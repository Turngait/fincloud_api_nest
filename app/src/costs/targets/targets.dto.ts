import { IsNumber, IsString } from 'class-validator';

export class TargetDTO {
  id?: number;

  @IsNumber()
  amount: number;

  @IsString()
  type: string;

  @IsString()
  created_at: string;

  @IsNumber()
  group_id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  account_id: number;
}
