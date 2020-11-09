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

            return curSellerDet.shopName;
        }
        else{
            return "Your account status is " + curSellerDet.status
        }
        
        
        }
    
    }

    
}
