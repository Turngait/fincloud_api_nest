import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserSettingsModule } from './user-settings/user-settings.module';

import DB_CONF from './config/db';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_CONF.DB_HOST,
      port: DB_CONF.DB_PORT,
      username: DB_CONF.DB_USERNAME,
      password: DB_CONF.DB_PASS,
      database: DB_CONF.DB_NAME,
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    UserSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
