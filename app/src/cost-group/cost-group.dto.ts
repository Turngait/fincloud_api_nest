import { IsNumber, IsString, MinLength } from 'class-validator';

export class CostGroupDTO {
  id?: number;

  @IsString()
  @MinLength(2)
  title: string;

  user_id?: number;

  @IsString()
  description: string;

  created_at?: Date;
  order?: number;

  @IsNumber()
  account_id: number;
}
