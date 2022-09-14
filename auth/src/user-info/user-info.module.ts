import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';
import UserInfoEntity from './user-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfoEntity])],
  controllers: [UserInfoController],
  providers: [UserInfoService],
  exports: [TypeOrmModule],
})
export class UserInfoModule {}
