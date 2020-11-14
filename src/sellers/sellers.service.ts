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
  }


  async permission(_id: ObjectID, data: Seller) {
    await this.sellerRepository.update({ _id }, data);
    return await this.sellerRepository.findOne(_id)
  }





  async findAll(): Promise<any> {
    let data = await this.sellerRepository.find()
    return data;
  }

  async create(data: SellerInfoInter): Promise<any> {
    let userData: any = ""
    let sellerData: any = ""
    try {
      const newUser  = new User()
      newUser.username = data.username
      newUser.password = data.password
      newUser.mail = data.mail
      newUser.cellNo = data.cellNo
      newUser.role = "seller-admin"
      newUser.status = "pending"
      newUser.createdAt = new Date()
      newUser.createdBy = data.mail
      userData = await this.userRepository.save(newUser);

      //creating new seller
      const newSeller = new Seller()
      newSeller.shopName = data.shopName
      newSeller.createdAt = new Date()
      newSeller.createdBy = data.mail
      newSeller.status = "pending"
      newSeller.mail = data.mail
      newSeller.cellNo = data.cellNo
      newSeller.folderName = data.shopName + Date.now()
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

  async update(data: any) {
    console.log("status", data["status"]);
    for (let key in data) {
      if (data.hasOwnProperty(key) && key != "status") {
        data[key].status = data["status"];
        data[key].updatedAt = new Date()
        data[key].updateBy = data.mail
        let _id  = data[key]._id;
        delete data[key]._id;
        let xup = await this.sellerRepository.update(_id, data[key]); 
      }
    }
    return data;
  }


  async sellerDetail(user: any) {
    var assignedSellerInfo = await this.sellerRepository.findOne(user.sl);
    return assignedSellerInfo
  }
}
