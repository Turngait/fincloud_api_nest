import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getTest() {
    return 'User works';
  }
}
