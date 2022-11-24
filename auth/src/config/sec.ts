import { createHash } from 'crypto';

const SALT = process.env.SALT || '';
const SALT2 = process.env.SALT2 || '';

export function createPassword(pass: string, paper: string): string {
  const newPass = createHash('md5').update(pass).digest('hex');
  return paper + newPass + SALT;
}

export function createPaper(): string {
  return createHash('md5').update(String(Date.now())).digest('hex');
}

export function createToken(): string {
  return createHash('md5').update(String(Date.now())).digest('hex');
}

export function createHashForRecovery(email): string {
  return createHash('md5')
    .update(email + SALT2)
    .digest('hex');
}

export function generatePass(email: string): string {
  const newPass = createHash('md5').update(email).digest('hex');
  return newPass.slice(0, 10);
}
