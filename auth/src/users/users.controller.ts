import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
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

  @Put('/changename')
  async changeName(@Body() dto: { token: string; name: string }) {
    return await this.userService.changeUserName(dto.token, dto.name);
  }

  @Put('/changepassword')
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
  @Put('/restorepass')
  async restoreUserPass(@Body() dto: { email: string }) {
    return await this.userService.restorePass(dto.email);
  }

  @Post('signout')
  async signOut(@Body() dto: { token: string }) {
    return await this.userService.singOut(dto.token);
  }

  @Delete('/deleteuser')
  async deleteUser(@Body() dto: { token: string }) {
    return await this.userService.deleteUser(dto.token);
  }
}
