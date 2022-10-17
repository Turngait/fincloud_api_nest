import { IsString } from 'class-validator';

export class UserInfoDTO {
  user_id: string;

  @IsString()
  local: string;

  @IsString()
  currency: string;
}
