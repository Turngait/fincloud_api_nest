import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import UserEntity from './users.entity';
import UserTokensEntity from './user-tokens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserTokensEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
