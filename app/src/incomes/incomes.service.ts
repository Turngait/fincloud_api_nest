import { Injectable } from '@nestjs/common';

@Injectable()
export class IncomesService {
  getTest() {
    return 'It works ' + process.env.API_KEY;
  }
}
