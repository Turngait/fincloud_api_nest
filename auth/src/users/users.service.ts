import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserEntity from './users.entity';
import { createPaper, createPassword, createToken } from 'src/config/sec';
import { dateToday } from '../utils/date';
import log, { LogLevels } from 'src/logger';
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
      log(`From user service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { token: null, msg: err, id: null } };
    }
  }

  async signIn(email: string, pass: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (user && user.pass === createPassword(pass, user.paper)) {
        user.token = createToken();
        await this.userRepository.save(user);
        return { status: 200, token: user.token, id: user.id, msg: '' };
      } else {
        return {
          status: 403,
          token: null,
          id: null,
          msg: 'Wrong email or password',
        };
      }
    } catch (err) {
      console.log(err);
      log(`From user service: ${err}`, LogLevels.ERROR);
      return { status: 500, token: null, id: null, msg: err };
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (err) {
      console.log(err);
      log(`From user service: ${err}`, LogLevels.ERROR);
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
      log(`From user service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { id: null, msg: err, token } };
    }
  }

  async getUserByToken(
    token: string,
  ): Promise<{ user: UserEntity | null; msg: string; token: string }> {
    try {
      const user = await this.userRepository.findOneBy({ token });
      if (user) return { user, msg: '', token };
      else return { user: null, msg: 'Wrong token', token };
    } catch (err) {
      console.log(err);
      log(`From user service: ${err}`, LogLevels.ERROR);
      return { user: null, msg: err, token };
    }
  }

  async changeUserPass(
    token: string,
    oldPass: string,
    newPass: string,
  ): Promise<any> {
    const { user } = await this.getUserByToken(token);
    if (!user && user.pass !== createPassword(oldPass, user.paper))
      return {
        status: 403,
        data: { isUpdated: false, msg: 'Password is not correct' },
      };
    user.pass = createPassword(newPass, user.paper);
    try {
      await this.userRepository.save(user);
      return { status: 200, data: { isUpdated: true, msg: '' } };
    } catch (err) {
      console.log(err);
      log(`From user service: ${err}`, LogLevels.ERROR);
      return { status: 500, data: { isUpdated: false, msg: err } };
    }
  }

  async getUserData(
    token: string,
  ): Promise<{ name: string; email: string; id: number }> {
    try {
      const { user } = await this.getUserByToken(token);
      if (!user) return { name: '', email: '', id: 0 };
      return { name: user.name, email: user.email, id: user.id };
    } catch (err) {
      console.log(err);
      log(`From user service: ${err}`, LogLevels.ERROR);
      return { name: '', email: '', id: 0 };
    }
  }
}
