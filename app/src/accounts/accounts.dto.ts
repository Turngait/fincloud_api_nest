import { IsNumber, IsString, MinLength } from 'class-validator';

export class AccountDTO {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  description: string;

  created_at: Date;

  @IsNumber()
  balance: number;

  @IsString()
  currency: string;

  is_active?: boolean;
}
