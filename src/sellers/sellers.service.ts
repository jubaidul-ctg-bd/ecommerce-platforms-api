import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { SellerUser } from 'src/sellers/sellerSchema/userSeller.entity';

import { User } from 'src/users/userSchema/user.entity';
import { ObjectID, Repository } from 'typeorm';
import { Seller } from './sellerSchema/seller.entity';
import { SellerInfoInter } from './sellerSchema/seller.interface'
// import mongoose from 'mongoose';
import {ObjectId,ObjectID as ObjID} from 'mongodb'

@Injectable()
export class SellersService {

    constructor(
        @InjectRepository(Seller,'ebhubon') private readonly sellerRepository: Repository<Seller>,
        @InjectRepository(SellerUser,'ebhubon') private readonly sellerUserRepository: Repository<SellerUser>,
        @InjectRepository(User,'ebhubon') private readonly userRepository: Repository<User>){}

        

        async delete(id: string) {
            await this.sellerRepository.delete(id);
          }

        async personDetails(_id: string) {
            console.log("ID====================",_id);
            return await this.sellerRepository.findOne(_id)
            //return this.sellerinfoRepository.update({_id}, data);
          }


        async permission(_id: ObjectID,data: Seller) {
            console.log("ID====================",_id);
            await this.sellerRepository.update({_id}, data); 
            return await this.sellerRepository.findOne(_id)
            //return this.sellerinfoRepository.update({_id}, data);
          }

        async find(username: string): Promise<User> {
            const name = await this.userRepository.findOne({username:username});
            
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


        // async update (id: number,data: SellerInfoInter) {
        // await this.sellerinfoRepository.update({_id}, data)
        //         return await this.sellerinfoRepository.findOne(id)
        // }

       
  
        async findAll(): Promise<any> {
            console.log('find all')
            let data = await this.sellerRepository.find() 
            return data;
        }

        async create(data: SellerInfoInter):Promise<any> {
            //const user = this.usersRepository.create(data);
            console.log("clalled mysql add method called")
            console.log(data)
            

            //creating a user account from sellers
            const newUser = new User()
            newUser.username=data.username
            newUser.password=data.password
            newUser.mail=data.mail
            newUser.cellNo=data.cellNo
            newUser.role="seller-admin"
            newUser.status="pending"
            //data.category.push(datavalue)
            await this.userRepository.save(newUser);

            console.log("NEW USER===========",newUser);
            

            
            const newSeller = new Seller()
            newSeller.shopName = data.shopName
            newSeller.CreatedAt = String(new Date())
            newSeller.CreatedBy = newUser.username
            newSeller.status="pending"
            
            console.log("asdasdasdasd",newSeller);
            // delete data.username;
            // delete data.password;
            // data.role = "sellerAdmin";
            // data.user_id = user._id;
            // data.status = "0";
            await this.sellerRepository.save(newSeller);

            console.log("New User===========",newUser)
            
            console.log("New Seller===========",newSeller)

            const newSellerUser= new SellerUser()

            newSellerUser.userId = String(newUser._id)
            newSellerUser.sellerId = String(newSeller._id)

            await this.sellerUserRepository.save(newSellerUser);
            return newSellerUser;
            // //creating table for storing sellers and users primary_key
            // const seller_user = new sellerUser();
            // seller_user.user_id=user._id;
            // seller_user.seller_id=data._id;
            // await this.sellerUserRepository.save(seller_user);

            


            
            //return await this.sellerinfoRepository.save(newSeller);
            // await this.usersmRepository.save(data);
            // return user;
            //return user;
        }


        //update
        async update(data: any) {

            console.log("status", data["status"]);
            
            
            for (let key in data) {
                if (data.hasOwnProperty(key) && key!="status") {
                    data[key].status = data["status"];
                    //data[key].updatedAt= new Date()
                    

                    // let sellerId = new sellers();
                    // sellerId._id =data[key]._id;
                    // sellerId._id = data[key]._id 
                    let _id  = data[key]._id;
                    // tmp = new ObjID(tmp)
                    console.log("_id",_id);
                    delete data[key]._id;
                    // let x = await this.sellerinfoRepository.update({_id}, data[key]); 
                    let x = await this.sellerRepository.findOne(_id); 
                    //delete x.shopName;
                    //delete x.role;
                    delete x.status;
                    //delete x.cellNo;
                    //delete x.mail;
                    console.log("x======",x);

                    let xup = await this.sellerRepository.update(x,data[key]); 
                    console.log("Vlaue=================",xup)
                }
              }
              return data;
            // console.log("ID====================",_id);
            // await this.sellerinfoRepository.update({_id}, data); 
            // return await this.sellerinfoRepository.findOne(_id)
            //return this.sellerinfoRepository.update({_id}, data);
          }


          async sellerDetail( user: any) {
            console.log(user)
            console.log("ID==================",user._id)
            //let sl = new sellerUser()
            //let { user_id,seller_id,createdAt,createdBy,updatedAt,updatedBy, ...result } = sl;
            //result = user._id
            //console.log("xxxxxxxxxxxxxxxxx",user._id)

            var assignedSellerInfo = await this.sellerUserRepository.findOne({where:{userId:user._id}});
            console.log("FOUNDED DETAILS==============",assignedSellerInfo)
            if(assignedSellerInfo==null)
            {
                return "No Seller found"
            }
            else{
            
            let curSellerDet= await this.sellerRepository.findOne(assignedSellerInfo.sellerId);
            //console.log("Current USER DETAILS================",curUserDet)
            if(curSellerDet.status=='approved'){

                return curSellerDet;
            }
            else{
                return "Your account is " + curSellerDet.status
            }
            //const { password,username,DOB,, ...result } = reslut;
            // console.log("useruseruseruser", curUserDet);
            
            }
            // let x = user._id
            // console.log("FINDING Seller USER ID===========", new_user._id)
            // //console.log("FINDING USER ID===========", new_user.user_id)
            // //console.log("FINDING Seller ID===========", new_user.seller_id)
            // let seller= await this.sellerinfoRepository.findOne({
            //     where:{_id:new_user.seller_id}})
            //console.log("sellersellersellersellerseller", seller)
            // let seller = this.sellerUserRepository.findOne((new_user.seller_id))
            
            // return this.sellerUserRepository.findOne({
            //     where:{user_id:x}});
            // return await this.sellerUserRepository.findOne({
            //     where:{seller_id:x},
            //   })
            }

}
