import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { PORT } from './config/api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
