import { IsDate, IsNumber, IsString, MinLength } from 'class-validator';

export class IncomeDTO {
  id?: number;

  @IsString()
  @MinLength(2)
  title: string;

  @IsNumber()
  year: number;

  @IsNumber()
  month: number;

  period?: string;

  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsNumber()
  source_id: number;

  @IsNumber()
  budget_id: number;

  user_id?: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  account_id: number;
}
