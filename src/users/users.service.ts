import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'process';
import { Repository, TreeLevelColumn } from 'typeorm';
import { User } from './userSchema/user.entity';
import { UserInfoInter } from './userSchema/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User,'ebhubon')private readonly userRepository: Repository<User>){}

    async authDecode( user: any) {
        let curUserDet= await this.userRepository.findOne(user._id)
        console.log("CURRENT USER DETAILS=================,",curUserDet)
        return curUserDet;
    }

   
    async findUser(username: string): Promise<User> {
        
        const name = await this.userRepository.findOne({cellNo:username});
        if(name!=null)
        {
            return name
        }
        const email = await this.userRepository.findOne({mail:username});
        if(email!=null)
        {
            return email
        }

        // const name = await this.userRepository.find({
        //     where: [
        //         { username: username},
        //         { mail: username},
        //         { cellNo: username}
        //     ]
        //     });

        // return 
        
        
    }

    async create(data: User):Promise<User> {
        let userData : any = ""
        try{
            const newUser = new User()
            newUser.username = data.mail
            newUser.password = data.password
            newUser.mail = data.mail
            newUser.cellNo = data.cellNo
            newUser.DOB = data.DOB
            newUser.address = data.address
            newUser.CreatedAt = String (new Date())
            newUser.CreatedBy = data.address
            if(!newUser.role) newUser.role = "user"
            userData  = await this.userRepository.save(newUser);
        }catch(err) {
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
