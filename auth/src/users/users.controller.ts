import { Controller, Get, Patch, Post, Body } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/test')
  getTest() {
    return this.userService.getTest();
  }

  @Post('/signin')
  async signIn(@Body() dto: UserDTO) {
    return await this.userService.signIn(dto.email, dto.pass);
  }

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
  async changePass() {
    return 'changePass';
  }
}
