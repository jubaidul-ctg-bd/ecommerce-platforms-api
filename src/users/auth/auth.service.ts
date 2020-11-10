import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../userSchema/user.entity';
import { SellersService } from 'src/sellers/sellers.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import { SellerUser } from 'src/sellers/sellerSchema/userSeller.entity';
import { Repository } from 'typeorm';
import {ObjectID} from 'typeorm'
import {ObjectId,ObjectID as ObjID} from 'mongodb'
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sellerService: SellersService,
    private jwtService: JwtService,
    @InjectRepository(Seller,'ebhubon') private readonly sellerRepository: Repository<Seller>,
    @InjectRepository(SellerUser,'ebhubon') private readonly sellerUserRepository: Repository<SellerUser>
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // console.log("auth.service called")
    // console.log("STRING PASSWORD",pass)
    // let newPassword = await bcrypt.hash(pass, 12);

    var user = await this.usersService.findUser(username);
    
    // const match = await bcrypt.compare(pass, user.password);
    // if(match)
    // {
    //   console.log("PASS")
    // }
    // else
    // {
    //   console.log("problem")
    // }
    //console.log("DATABASE PASSWORD=========",user.password)
    //console.log("Decript PASSWORD=========",user)
    
    if (user && user.password === pass)  {

      const result = user;
      return result;
    }

    return null;
  }

  async login(user: any,useragent : string) {
    const payload = { mail: user.mail, username: user.username , _id: user._id ,role: user.role };

    
    if(user.status==="error") 
    {       
      return "Username or password mismatched"
    }
    
    if(useragent && useragent=='seller'){
        
        // find at selleruser if not found then you are not authorized
        var currentId = String(user._id)
        console.log("TYPE OFFF===============",typeof currentId, currentId);
        
        var sellerUser: any= await this.sellerUserRepository.find({
          where:{userId:currentId},
        })

        console.log("sellerUser", sellerUser);
        
        
        if(!sellerUser){
          return "You are not authorized yet"
        }
        else
        {
          var sellerUserId=  sellerUser.sellerId
          const seller: any = await this.sellerRepository.findOne(sellerUserId)

          console.log("seller Details", sellerUser);
          console.log("seller.status", seller.status);
          console.log("seller.status", seller);
          
          if(seller.status!="approved") {
            return "the seller is " + seller.status+ ", please contact with system admin"
          }
          else{
            payload['sl'] = seller._id
          }
        }
        // if found then find the seller is active or not, if not then send a message, the seller is not activated yet, please contact with system admin
    }
    console.log("UGER AGENT IS NOT SELLER==================")
    return {
      status: "ok",
      role: user.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}