import { IsEmail, IsString } from 'class-validator';
export class UserDTO {
  @IsEmail()
  email: string;

  @IsString()
  pass: string;

  name?: string;
}
