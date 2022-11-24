import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

import { AUTH_URL } from 'src/config/api';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // TODO Move user's methods to another module
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

  async getUserIdByToken(token: string): Promise<number | null> {
    const { status, data } = await fetch(AUTH_URL + 'users/getid', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    if (status && status === 200) return +data.id;
    else return null;
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
