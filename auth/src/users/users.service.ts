import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserEntity from './users.entity';
import { createPaper, createPassword, createToken } from 'src/config/sec';
import { dateToday } from '../utils/date';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getTest() {
    return { status: 'User works' };
  }

  async addUser(email: string, pass: string, name: string) {
    const oldUser = await this.getUserByEmail(email);
    if (oldUser)
      return {
        status: 409,
        data: { token: null, msg: 'User with such email is exist', id: null },
      };
    const paper = createPaper();
    const user = new UserEntity();
    user.email = email;
    user.paper = paper;
    user.pass = createPassword(pass, paper);
    user.created_at = dateToday();
    user.name = name;
    user.token = createToken();

    try {
      await this.userRepository.save(user);
      return { status: 202, data: { token: user.token, msg: '', id: user.id } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: { token: null, msg: err, id: null } };
    }
  }

  async signIn(email: string, pass: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (user.pass === createPassword(pass, user.paper)) {
        user.token = createToken();
        await this.userRepository.save(user);
        return { status: 200, token: user.token, msg: '' };
      } else {
        return { status: 403, token: 122222, msg: 'Wrong email or password' };
      }
    } catch (err) {
      console.log(err);
      return { status: 500, token: null, msg: err };
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getUserIdByToken(token: string): Promise<{
    status: number;
    data: { id: number | null; msg: string; token: string };
  }> {
    try {
      const user = await this.userRepository.findOneBy({ token });
      if (user) return { status: 200, data: { id: user.id, msg: '', token } };
      else
        return { status: 404, data: { id: null, msg: 'Wrong token', token } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: { id: null, msg: err, token } };
    }
  }
}
