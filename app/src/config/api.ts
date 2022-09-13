const MAIL_API_KEY: string = process.env.MAIL_API_KEY || '';
const API_KEYS: string[] = [process.env.API_KEY];
const PORT: number = +process.env.PORT || 3000;
const AUTH_URL = 'http://express-auth:4000/';
export { MAIL_API_KEY, API_KEYS, PORT, AUTH_URL };
