import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './userSchema/user.entity';
import { UserInfoInter } from './userSchema/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User,'ebhubon')private readonly userRepository: Repository<User>){}

    async authDecode( user: any) {
        console.log(user)
        console.log("ID==================",user._id)
        //let sl = new sellerUser()
        //let { user_id,seller_id,createdAt,createdBy,updatedAt,updatedBy, ...result } = sl;
        //result = user._id
        //console.log("xxxxxxxxxxxxxxxxx",user._id)
        let curUserDet= await this.userRepository.findOne(user._id)
        let reslut = new User()
        //const { password,username,DOB,, ...result } = reslut;
        console.log("useruseruseruser", curUserDet);
        
        // let x = user._id
        // console.log("FINDING Seller USER ID===========", new_user._id)
        // //console.log("FINDING USER ID===========", new_user.user_id)
        // //console.log("FINDING Seller ID===========", new_user.seller_id)
        // let seller= await this.sellerinfoRepository.findOne({
        //     where:{_id:new_user.seller_id}})

        //console.log("sellersellersellersellerseller", seller)
        // let seller = this.sellerUserRepository.findOne((new_user.seller_id))
        return curUserDet;
        // return this.sellerUserRepository.findOne({
        //     where:{user_id:x}});
        // return await this.sellerUserRepository.findOne({
        //     where:{seller_id:x},
        //   })
        }




    async findUser(username: string): Promise<User> {
        console.log("FINDING DETAILS",username)
        const name = await this.userRepository.findOne({username:username});
        console.log(name)
        if(name!=null)
        {
            console.log("HERE1111111111111111")
            console.log(name)
            return await this.userRepository.findOne({username:username});
        }
        const email = await this.userRepository.findOne({mail:username});
        if(email!=null)
        {
            console.log("HERE2222222222222")
            console.log(name)
            return await this.userRepository.findOne({mail:username});
        }
        
        
    }



    async findSeller(username: string): Promise<User> {
        console.log("FINDING DETAILS",username)
        const name = await this.userRepository.findOne({username:username});
        console.log(name)
        if(name!=null)
        {
            console.log("HERE1111111111111111")
            console.log(name)
            return await this.userRepository.findOne({username:username});
        }
        const email = await this.userRepository.findOne({mail:username});
        if(email!=null)
        {
            console.log("HERE2222222222222")
            console.log(name)
            return await this.userRepository.findOne({mail:username});
        }
        
        
    }
  

    async create(data: UserInfoInter):Promise<User> {
        //const user = this.usersRepository.create(data);
        console.log("clalled mysql add method called")
        console.log(data)
        return  this.userRepository.save(data);
        // await this.usersmRepository.save(data);
        // return user;
        //return user;
    }

    async delete(id: string) {
        await this.userRepository.delete(id);
      }
}
