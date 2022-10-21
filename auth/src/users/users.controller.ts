import {
  Controller,
  Patch,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post('/signin')
  async signIn(@Body() dto: UserDTO) {
    return await this.userService.signIn(dto.email, dto.pass);
  }

  @UsePipes(new ValidationPipe())
  @Post('/signup')
  async regUser(@Body() dto: UserDTO) {
    return await this.userService.addUser(dto.email, dto.pass, dto.name);
  }

  @Post('/getid')
  async getId(@Body() dto: { token: string }) {
    return await this.userService.getUserIdByToken(dto.token);
  }

  @Patch('/setdata')
  async changeData() {
    return 'changeData';
  }

  @Patch('/changepassword')
  async changePass(
    @Body() dto: { token: string; oldPass: string; newPass: string },
  ) {
    return await this.userService.changeUserPass(
      dto.token,
      dto.oldPass,
      dto.newPass,
    );
  }

  @Post('/getdata')
  async getUserData(@Body() dto: { token: string }) {
    return await this.userService.getUserData(dto.token);
  }
}
