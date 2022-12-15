/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { User } from 'src/Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]),],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController], 
})
export class UsersModule {}