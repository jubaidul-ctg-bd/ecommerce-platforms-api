import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

import { User } from '../userSchema/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username,password);

    //console.log("USER DETAILS=============",user)
    if (!user) {
      console.log("HERE")
      return {status: "error"};
      //throw new NotFoundException();
    }

    
    return user;
  }
}