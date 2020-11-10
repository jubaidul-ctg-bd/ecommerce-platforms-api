import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { SellerUser } from 'src/sellers/sellerSchema/userSeller.entity';

import { User } from 'src/users/userSchema/user.entity';
import { ObjectID, Repository } from 'typeorm';
import { Seller } from './sellerSchema/seller.entity';
import { SellerInfoInter } from './sellerSchema/seller.interface'
// import mongoose from 'mongoose';
import { ObjectId, ObjectID as ObjID } from 'mongodb'

@Injectable()
export class SellersService {

  constructor(
    @InjectRepository(Seller, 'ebhubon') private readonly sellerRepository: Repository<Seller>,
    @InjectRepository(SellerUser, 'ebhubon') private readonly sellerUserRepository: Repository<SellerUser>,
    @InjectRepository(User, 'ebhubon') private readonly userRepository: Repository<User>) { }



  async delete(id: string) {
    await this.sellerRepository.delete(id);
  }

  async personDetails(_id: string) {
    return await this.sellerRepository.findOne(_id)
    //return this.sellerinfoRepository.update({_id}, data);
  }


  async permission(_id: ObjectID, data: Seller) {
    await this.sellerRepository.update({ _id }, data);
    return await this.sellerRepository.findOne(_id)
    //return this.sellerinfoRepository.update({_id}, data);
  }





  async findAll(): Promise<any> {
    let data = await this.sellerRepository.find()
    return data;
  }

  async create(data: SellerInfoInter): Promise<any> {
    let userData: any = ""
    let sellerData: any = ""

    //data.category.push(datavalue)
    try {

      //creating new user
      const newUser :any = new User()
      newUser.username = data.username
      newUser.password = data.password
      newUser.mail = data.mail
      newUser.cellNo = data.cellNo
      newUser.role = "seller-admin"
      newUser.status = "pending"
      userData = await this.userRepository.save(newUser);

      //creating new seller
      const newSeller = new Seller()
      newSeller.shopName = data.shopName
      newSeller.CreatedAt = String(new Date())
      newSeller.CreatedBy = newUser.username
      newSeller.status = "pending"
      newSeller.mail = data.mail
      newSeller.cellNo = data.cellNo
      sellerData = await this.sellerRepository.save(newSeller);

      const newSellerUser = new SellerUser()
      newSellerUser.userId = String(newUser._id)
      newSellerUser.sellerId = String(newSeller._id)
      await this.sellerUserRepository.save(newSellerUser);
      return sellerData;

    } catch (err) {

      //if any circumstance user is created but failed to create seller
      if(userData){
        this.userRepository.delete(userData._id);
      }
      //if any circumstance seller is created but failed to selleruser 
      if(sellerData){
        this.sellerRepository.save(sellerData._id);
      }
      return err.writeErrors[0].errmsg
    }

  }


  //update
  async update(data: any) {

    console.log("status", data["status"]);


    for (let key in data) {
      if (data.hasOwnProperty(key) && key != "status") {
        data[key].status = data["status"];
        //data[key].updatedAt= new Date()


        // let sellerId = new sellers();
        // sellerId._id =data[key]._id;
        // sellerId._id = data[key]._id 
        let _id = data[key]._id;
        // tmp = new ObjID(tmp)
        console.log("_id", _id);
        delete data[key]._id;
        // let x = await this.sellerinfoRepository.update({_id}, data[key]); 
        let x = await this.sellerRepository.findOne(_id);
        //delete x.shopName;
        //delete x.role;
        delete x.status;
        //delete x.cellNo;
        //delete x.mail;
        console.log("x======", x);

        let xup = await this.sellerRepository.update(x, data[key]);
        console.log("Vlaue=================", xup)
      }
    }
    return data;
    // console.log("ID====================",_id);
    // await this.sellerinfoRepository.update({_id}, data); 
    // return await this.sellerinfoRepository.findOne(_id)
    //return this.sellerinfoRepository.update({_id}, data);
  }


  async sellerDetail(user: any) {
    console.log(user)
    console.log("ID==================", user._id)
    //let sl = new sellerUser()
    //let { user_id,seller_id,createdAt,createdBy,updatedAt,updatedBy, ...result } = sl;
    //result = user._id
    //console.log("xxxxxxxxxxxxxxxxx",user._id)

    var assignedSellerInfo = await this.sellerUserRepository.findOne({ where: { userId: user._id } });
    console.log("FOUNDED DETAILS==============", assignedSellerInfo)
    if (assignedSellerInfo == null) {
      return "No Seller found"
    }
    else {

      let curSellerDet = await this.sellerRepository.findOne(assignedSellerInfo.sellerId);
      //console.log("Current USER DETAILS================",curUserDet)
      if (curSellerDet.status == 'approved') {

        return curSellerDet;
      }
      else {
        return "Your account status is " + curSellerDet.status
      }
      //const { password,username,DOB,, ...result } = reslut;
      // console.log("useruseruseruser", curUserDet);

    }

  }





}
