const MAIL_API_KEY: string = process.env.MAIL_API_KEY || '';
const API_KEYS: string[] = [process.env.API_KEY];
const PORT: number = +process.env.PORT || 3000;
const AUTH_URL = 'http://fc-auth:3000/';
// const AUTH_URL = 'http://users:8000/';
const NOTIFY_URL = 'http://fc-notify:8000/';
const ANALYST_API = 'http://cmu-analytics:5000/';
export { MAIL_API_KEY, API_KEYS, PORT, AUTH_URL, NOTIFY_URL, ANALYST_API };
