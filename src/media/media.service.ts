import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import { SellerUser } from 'src/sellers/sellerSchema/userSeller.entity';
import { User } from 'src/users/userSchema/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {

    constructor(
        @InjectRepository(Seller,'ebhubon') private readonly sellerRepository: Repository<Seller>,
        @InjectRepository(SellerUser,'ebhubon') private readonly sellerUserRepository: Repository<SellerUser>,){}



    async mediaSeller( user: any) {
        console.log("payload==========", user);
        var assignedSellerInfo = await this.sellerRepository.findOne(user.sl);
        console.log("assignedSellerInfo.shopName", assignedSellerInfo.shopName);
        
        return assignedSellerInfo.shopName;
    }
    
}

    

