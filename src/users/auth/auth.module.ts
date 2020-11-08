import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users.module';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SellersModule } from 'src/sellers/sellers.module';


@Module({
  imports: [
    forwardRef(() => UsersModule,),
    forwardRef(() => SellersModule,),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },

    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService,PassportModule],
})
export class AuthModule {}