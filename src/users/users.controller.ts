import { Body, Controller, Get, Post,Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './userSchema/user.entity';
import { UsersService } from './users.service';
import jwt_decode from 'jwt-decode';
@Controller('user')
export class UsersController {

    constructor(private readonly userInfoService: UsersService,private authService: AuthService) {}


    @UsePipes(new ValidationPipe())
    @Post('registration')
    createfirst(@Body() user: User) {
        console.log("clalled mysql post")
        return this.userInfoService.create(user);
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      console.log("SELLERCALLED")
      console.log("auth/login========", req.user);
      return this.authService.login(req.user);
    }



    @Post('delete')
    delete(@Body() body) {
        console.log(body)
        return this.userInfoService.delete(body.id);
    }

    @Get('currentuser')
    authDecode(@Request() req){ 
    // //console.log("DECODE====================", req)
    // console.log("DECODED CALLED",req.headers)
    const header = req.headers.authorization
    //console.log("AUTH TOKEN================",header)
    // const head_split = header.substr(7,header.length-7)
    const decoded = jwt_decode(header);
    console.log(decoded)
    // console.log(decoded)
    
    return this.userInfoService.authDecode(decoded);
    
    }
}
