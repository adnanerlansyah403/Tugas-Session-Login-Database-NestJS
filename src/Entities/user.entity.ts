/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
  export class User{
    @PrimaryGeneratedColumn({
      type: 'bigint',
      name: 'id'
    }) id:number 

    @Column({
      name: "username",
      nullable: false,
      default: ''
    }) username: string
    
    @Column({
      name: "email",
      nullable: false,
      default: '',
    }) email: string
    
    @Column({
      name: "password",
      nullable: false,
      default: ''
    }) password: string

  }