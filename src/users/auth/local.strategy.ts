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
    console.log("local.strategy called")
    console.log(username)
    console.log(password)
    const user = await this.authService.validateUser(username,password);

    console.log("LocalStrategy========", user);
    
    
    if (!user) {

      return {status: "error"};
      //throw new NotFoundException();
    }
    console.log("local.strategy called is returing valid user")
    return user;
  }
}