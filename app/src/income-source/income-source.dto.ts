import { IsNumber, IsString, MaxLength } from 'class-validator';

export class IncomeSourceDTO {
  id?: number;

  @IsString()
  @MaxLength(2)
  title: string;

  @IsString()
  description: string;

  order?: number;
  created_at?: Date;
  user_id?: number;

  @IsNumber()
  account_id: number;
}
