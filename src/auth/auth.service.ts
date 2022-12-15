/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, pass: string | number): Promise<any> {
    const user = await this.usersService.findUsersByUsername(username);
    console.log(user)
    if (user == null) {
      return null
    }
    const { password, ...result } = user;
    return result;
  }
}