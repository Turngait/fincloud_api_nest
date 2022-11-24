import {MAIL_KEY, MAIL_URL} from '../config/api';
import {IData} from '../interfaces/mail';

export default class MailService {
  static async send(data: IData) {
    return await fetch(MAIL_URL, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', TOKEN:  MAIL_KEY},
      body: JSON.stringify(data)
    })
    .then((res) => res.json());
  }
}
