import {Request, Response} from 'express';

import MailService from '../services/Mail.Service';
import {IData} from '../interfaces/mail';

export default class MailTransportController {
  static async sendMail(req: Request, res: Response) {
    const data: IData = {
      to: req.body.to,
      name: req.body.name,
      pass: req.body.pass,
      type: req.body.type,
    };

    const result = await MailService.send(data);
    res.json(result);
  }

}