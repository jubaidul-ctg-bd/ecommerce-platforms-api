import { Body, Controller, Get, HttpStatus, Post,Request, Res, UseGuards, UsePipes, ValidationPipe,HttpException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './userSchema/user.entity';
import { UsersService } from './users.service';
import jwt_decode from 'jwt-decode';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('user')
export class UsersController {

    constructor(private readonly userInfoService: UsersService,private authService: AuthService) {}


    
    @UsePipes(new ValidationPipe())
    @Post('registration')
    async createfirst(@Body() user: User) {
      //console.log("SERLLER CONTROLLR CALLED",user)
        let newUser : any = {}
        try{
              newUser = await this.userInfoService.create(user);
        }catch(err){
            //console.log("ERROR================",err)
            return err;
        }
        return await newUser
    }
    





    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      console.log("USER AGENT=============",req.body.userAgent)
      let userAgent = "";
      if(req.body && req.body.hasOwnProperty("userAgent") && req.body.userAgent)
        userAgent = req.body.userAgent;
      return this.authService.login(req.user,userAgent);
    }







    @UseGuards(JwtAuthGuard)
    @Post('delete')
    delete(@Body() body) {
        return this.userInfoService.delete(body.id);
    }


    //sending username 
    @UseGuards(JwtAuthGuard)
    @Get('currentuser')
    authDecode(@Request() req){ 
    return this.userInfoService.authDecode(req.user);
    
    }
}
