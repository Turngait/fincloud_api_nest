import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  async test() {
    return 'test';
  }

  @Post('/getfindata"')
  async getFinData() {
    return 'Fin data';
  }

  @Post('/user/signin')
  async signIn(@Body() dto: { email: string; pass: string }) {
    return await this.appService.signIn(dto.email, dto.pass);
  }

  @Post('/user/signup')
  async signUp(@Body() dto: { email: string; pass: string; name: string }) {
    return await this.appService.signUp(dto.email, dto.pass, dto.name);
  }

  @Patch('/user/setdata')
  async changeData() {
    return 'changeData';
  }

  @Patch('/user/changepassword')
  async changePass() {
    return 'changePass';
  }
}
