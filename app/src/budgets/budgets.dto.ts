import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator';

export class BudgetDTO {
  id?: number;

  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  description: string;
  user_id?: number;

  @IsNumber()
  balance: number;

  @IsBoolean()
  is_calculating: boolean;

  @IsString()
  created_at: string;

  @IsNumber()
  account_id: number;
}
