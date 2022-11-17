import express from 'express';
import dotenv from 'dotenv';

import { PORT } from './src/config/api';

import mailRouter from './src/routes/mail';

dotenv.config();

const app: express.Express = express();

app.use(express.json({
  inflate: true,
  strict: true,
  type: 'application/json'
}));

app.use('/mail', mailRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
