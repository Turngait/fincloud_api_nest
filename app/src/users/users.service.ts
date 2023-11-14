import { Injectable } from '@nestjs/common';
import { AUTH_URL } from 'src/config/api';

import fetch from 'node-fetch';

import RedisClient from 'src/providers/RedisClient';

@Injectable()
export class UsersService {
  async signIn(
    email: string,
    pass: string,
  ): Promise<{ status: number; token: string; id: number; msg: string }> {
    const result = await fetch(AUTH_URL + 'users/signin', {
      method: 'POST',
      body: JSON.stringify({ email, pass }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    return result;
  }

  async signUp(email: string, pass: string, name: string) {
    const result = await fetch(AUTH_URL + 'users/signup', {
      method: 'POST',
      body: JSON.stringify({ email, pass, name }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    return result;
  }

  async getUserIdByToken(token: string): Promise<string | null> {
    const userId = await RedisClient.getValueByKey(token);
    if (!userId) {
      const userIdFromAPI = await this.getUserIDFromAPI(token);
      if (userIdFromAPI) RedisClient.setValueByKey(token, userIdFromAPI);
      return userIdFromAPI;
    } else {
      return userId;
    }
  }

  async getUserIDFromAPI(token: string) {
    const result: { token: string; status: number } = await fetch(
      AUTH_URL + 'users/getid',
      {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' },
      },
    ).then((res) => res.json());
    return result.token;
  }
  async changeUserPass(
    token: string,
    oldPass: string,
    newPass: string,
  ): Promise<{ status: number; token: string; id: number; msg: string }> {
    const result = await fetch(AUTH_URL + 'users/changepassword', {
      method: 'PUT',
      body: JSON.stringify({ token, oldPass, newPass }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    return result;
  }

  async getUserData(
    token: string,
  ): Promise<{ name: string; email: string; id: number }> {
    const result = await fetch(AUTH_URL + 'users/getdata', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    return result;
  }

  async setNewName(
    token: string,
    name: string,
  ): Promise<{ status: number; data: { isUpdated: boolean; msg: string } }> {
    const result = await fetch(AUTH_URL + 'users/changename', {
      method: 'PUT',
      body: JSON.stringify({ token, name }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    return result;
  }

  async restorePass(email: string): Promise<{
    status: number;
    data: { isUpdated: boolean; pass: string; name: string; msg: string };
  }> {
    const result = await fetch(AUTH_URL + 'users/restorepass', {
      method: 'PUT',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    return result;
  }
}
