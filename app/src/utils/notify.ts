import fetch from 'node-fetch';

import { NOTIFY_URL } from 'src/config/api';
import { NotifyTypes } from 'src/interfaces/common';

interface INotifyData {
  to: string;
  name: string;
  pass?: string;
  msg?: string;
  type: NotifyTypes;
}

export async function sendNotificationByMail(
  data: INotifyData,
): Promise<{ status: number; msg: string }> {
  return await fetch(NOTIFY_URL + 'mail/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
