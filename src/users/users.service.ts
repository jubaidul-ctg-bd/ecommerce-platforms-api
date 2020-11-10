import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'process';
import { Repository } from 'typeorm';
import { User } from './userSchema/user.entity';
import { UserInfoInter } from './userSchema/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User,'ebhubon')private readonly userRepository: Repository<User>){}

    async authDecode( user: any) {
       
        let curUserDet= await this.userRepository.findOne(user._id)
        let reslut = new User()
        
        return curUserDet;
        
        }
        // const name = await this.userRepository.find({
        //     where: [
        //       { username: username, password: password },
        //       { mail: username, password: password },
        //       { cellNo: username, password: password }
        //     ]
        //   });
    async findUser(username: string): Promise<User> {
        
        const name = await this.userRepository.findOne({cellNo:username});
        if(name!=null)
        {
            return await this.userRepository.findOne({cellNo:username});
        }
        const email = await this.userRepository.findOne({mail:username});
        if(email!=null)
        {
            return await this.userRepository.findOne({mail:username});
        }
        
        
    }

    async create(data: User):Promise<User> {
        
        let userData : any = ""
        try{
            data.username = data.mail
            userData  = await this.userRepository.save(data);
        }catch(err) {
            console.log("ERROR=======================",err)
            return err.writeErrors[0].errmsg        
        
        }
        return await userData
        // await this.usersmRepository.save(data);
        // return user;
        //return user;
    }

    async delete(id: string) {
        await this.userRepository.delete(id);
      }
}
