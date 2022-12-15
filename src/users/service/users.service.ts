/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import CreateUserDto from 'src/dto/user.dto';
import { User } from 'src/Entities/user.entity';

@Injectable()
export class UsersService {

  // constructor() {
  //   // const saltRounds = 10; 
  //   // const salt = bcrypt.genSaltSync(10);
  //   this.users = [
  //     {
  //       userId: 1,
  //       username: 'john',
  //       password: bcrypt.hashSync('changeme', 10),
  //       bio: {
  //         name: 'John Doe',
  //         email: 'john@doe.com',
  //         address: '123 Main St',
  //         age: 19
  //       },
  //     },
  //     {
  //       userId: 2,
  //       username: 'chris',
  //       password: bcrypt.hashSync('secret', 10),
  //       bio: {
  //         name: 'Christoper Doe',
  //         email: 'chris@doe.com',
  //         address: '123 Main Street',
  //         age: 20
  //       },
  //     },
  //     {
  //       userId: 3,
  //       username: 'maria',
  //       password: bcrypt.hashSync('guess', 10),
  //       bio: {
  //         name: 'Mario Doe',
  //         email:'maria@doe.com',
  //         address: '123 Main Streets',
  //         age: 30
  //       },
  //     },
  //   ];
  // }

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  getUsers(){
    return this.userRepository.find();
  }

  async updateUser(request: CreateUserDto, userId: number){
    const userExist = await this.userRepository.findOne({
      where:{
        id: userId
      }
    })
    if(!userExist){
      throw new BadRequestException("Data user tidak ditemukan")
    }

    // Login Update
    userExist.email = request.email
    userExist.username = request.username
    userExist.password = request.password

    return await this.userRepository.update(userId, userExist )
  }

  createUser(request: CreateUserDto){
    const user = this.userRepository.create(request)
    return this.userRepository.save(user)
  }

  findUsersById(id:number){
    return this.userRepository.findOne({where:{id}})
  }
  
  findUsersByUsername(username:string){
    return this.userRepository.findOne({where:{username}})
  }

  async deleteUser(userId: number) {
    // get existing data
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    })

    if(!user) {
      throw new BadRequestException('User tidak di temukan');
    }

    // execute delete query
    this.userRepository.remove(user);
  }
}