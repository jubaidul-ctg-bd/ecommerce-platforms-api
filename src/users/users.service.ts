import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'process';
import { Repository, TreeLevelColumn } from 'typeorm';
import { User } from './userSchema/user.entity';
import { UserInfoInter } from './userSchema/user.interface';
import {getMongoRepository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User,'ebhubon')private readonly userRepository: Repository<User>){}


    async update(data: any) {
        let userId = data._id
        delete data._id 
        let UpdatedData = await this.userRepository.update(userId,data); 
        return UpdatedData;
      }

    
    async  updateList(data: any) {
        console.log("role", data["role"]);
        for (let key in data) {
            if (data.hasOwnProperty(key) && key!="role") {
                data[key].role = data["role"];
                data[key].updatedAt= new Date()
                data[key].updatedBy = data.mail
                let _id  = data[key]._id;
                delete data[key]._id;
                let x = await this.userRepository.findOne(_id); 
                delete x.status;
                let xup = await this.userRepository.update(x,data[key]); 
            }
          }
          return data;
      }


    async findAll(): Promise<any> {
        let data =await this.userRepository.find()
        return data;
      }


    async authDecode( user: any) {
        let curUserDet= await this.userRepository.findOne(user._id)
        return curUserDet;
    }

   
    async findUser(username: string): Promise<User> {
        const userRepository = getMongoRepository(User,'ebhubon')
        const name = await this.userRepository.findOne({
            where: {
                $or: [
                    { username: username},
                    { mail: username},
                    { cellNo: username}
                  ]
              }
            });
        console.log(name)
        return name;
    }

    async create(data: User):Promise<User> {
        let userData : User;
        try{
            const newUser = new User()
            newUser.username = data.mail
            newUser.password = data.password
            newUser.mail = data.mail
            newUser.cellNo = data.cellNo
            newUser.DOB = data.DOB
            newUser.address = data.address
            newUser.createdAt =  new Date()
            newUser.createdBy = data.mail
            newUser.name = data.name
            newUser.role = data.role
            if(!data.role){ 
                newUser.role = "user"
            }
            userData  = await this.userRepository.save(newUser);
        }catch(err) {
            return err.writeErrors[0].errmsg        
        }
        return await userData
    }

    async delete(id: string) {
        const data = await this.userRepository.delete(id);
        if (!data)
        {
            throw new HttpException('Not found',HttpStatus.NOT_FOUND)
        }
        return data
    }
}
