import { Router } from 'express';

import MailTransportController from '../controllers/MailController';

const router = Router();

router.post('/send', MailTransportController.sendMail);

export default router;
