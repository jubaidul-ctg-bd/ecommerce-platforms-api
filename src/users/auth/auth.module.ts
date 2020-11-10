import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users.module';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SellersModule } from 'src/sellers/sellers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SellerUser } from 'src/sellers/sellerSchema/userSeller.entity';
import { Seller } from 'src/sellers/sellerSchema/seller.entity';


@Module({
  imports: [
    forwardRef(() => UsersModule,),
    forwardRef(() => SellersModule,),
    TypeOrmModule,TypeOrmModule.forFeature([SellerUser],'ebhubon'),
    TypeOrmModule.forFeature([Seller],'ebhubon'),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000000s' },

    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService,PassportModule],
})
export class AuthModule {}