import { Body, Controller, Post, UseGuards ,Request, Get, Param, Put, UsePipes, ValidationPipe, HttpException, HttpStatus} from '@nestjs/common';
import { config } from 'process';

import { AuthService } from 'src/users/auth/auth.service';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/users/auth/local-auth.guard';
import { Seller } from './sellerSchema/seller.entity';
import { SellerInfoInter } from './sellerSchema/seller.interface';
import { SellersService } from './sellers.service';
//import * as jwt_decode from 'jwt-decode'
import jwt_decode from 'jwt-decode';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';


@Controller('seller')
export class SellersController {


    constructor(private readonly sellerInfoService: SellersService,private authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('registration')
    async createfirst(@Body() user: SellerInfoInter): Promise<Seller> {
        let newUser : any = {}
        try{
              newUser = await this.sellerInfoService.create(user);;
        }catch(err){
            //throw new HttpException(err,HttpStatus.CONFLICT)
            console.log("error=================",err)
            return err.errmsg
        }
        return newUser
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    find(): Promise<SellerInfoInter> {
        return this.sellerInfoService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('specific')
    personalDetails(@Param() params) {
        return this.sellerInfoService.personDetails(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('access')
    permission(@Body() params) {
        
        return this.sellerInfoService.permission(params.id,params);
    }

    // @UseGuards(JwtAuthGuard)
    // @Put(':id')
    // update(@Param('id') id,@Body() user: SellerInfoInter) {
    //     return this.sellerInfoService.update(id, user);
    // }

    
    @UseGuards(JwtAuthGuard)
    @Post('delete')
    delete(@Body() body) {
        
        return this.sellerInfoService.delete(body.id);
    }


    @UseGuards(JwtAuthGuard)
    @Post('update')
    update(@Body() params) {
        return this.sellerInfoService.update(params);
    }

    @UseGuards(JwtAuthGuard)
    @Get('currentSeller')
    sellerDetail(@Request() req) {
        return this.sellerInfoService.sellerDetail(req.user);
    }
    
//     @Get('logout')
//     logout(@Request() req, @Res() res: Response): void {
//     req.logout();
//   }
}
