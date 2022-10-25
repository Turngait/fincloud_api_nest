import { IsNumber, IsString, MinLength } from 'class-validator';

export class CostDTO {
  id?: number;

  @IsString()
  @MinLength(2)
  title: string;

  @IsNumber()
  year: number;

  @IsNumber()
  month: number;

  @IsString()
  description: string;

  @IsString()
  date: string;

  @IsNumber()
  group_id: number;

  @IsNumber()
  budget_id: number;

  @IsNumber()
  amount: number;

  period?: string;

  @IsNumber()
  account_id: number;
}
