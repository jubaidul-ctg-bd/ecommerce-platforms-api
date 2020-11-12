import { Catch, Injectable } from '@nestjs/common';
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

    try {
      const match = await bcrypt.compare(pass, user.password);
      if (user && match)  {

        const result = user;
        return result;
      }
    } catch(err) {
      return null;
    }
    
   
  }

  async login(user: any,useragent : string) {
    const payload = { mail: user.mail, username: user.username , _id: user._id ,role: user.role };

    
    if(user.status==="error") 
    {       
      return "Username or password mismatched"
    }
    
    let sUser = new SellerUser()
    if(useragent && useragent=='seller'){
        
        // find at selleruser if not found then you are not authorized
        var currentId = String(user._id)
        // console.log("TYPE OFFF===============",typeof currentId, currentId);
        
        sUser = await this.sellerUserRepository.findOne({
          where:{userId:currentId},
        })

        // console.log("sellerUser", sUser);
        // console.log("sellerUserId================", sUser);

        
        
        if(!sUser){
          return "You are not authorized yet"
        }
        else
        {
          var sellerUserId=  sUser.sellerId
          // console.log("sellerUserId================", sellerUserId);
          
          const seller: any = await this.sellerRepository.findOne(sellerUserId)

          // console.log("seller Details", sellerUser);
          // console.log("seller.status", seller.status);
          // console.log("seller.status", seller);
          
          if( !(seller.status=="approved" || seller.status=="pending") ) {
            return "the seller is " + seller.status+ ", please contact with system admin"
          }
          else{
            payload['sl'] = sellerUserId
          }
        }
        // if found then find the seller is active or not, if not then send a message, the seller is not activated yet, please contact with system admin
    }
    else if(useragent && useragent=='user') {} 
    else if(useragent && useragent=='admin') {}
    return {
      status: "ok",
      role: user.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}