import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerUser } from 'src/sellers/sellerSchema/userSeller.entity';
import { AuthModule } from 'src/users/auth/auth.module';
import { User } from 'src/users/userSchema/user.entity';
import { Seller } from './sellerSchema/seller.entity';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';
import { sellerCreateMiddleware } from './middleware/sellerCreate.middleware';
import { sellerUpdateMiddleware } from './middleware/sellerUpdate.middleware';

@Module({
  imports: [forwardRef(() => AuthModule),TypeOrmModule,TypeOrmModule.forFeature([Seller],'ebhubon'),TypeOrmModule.forFeature([User],'ebhubon'),
  TypeOrmModule.forFeature([SellerUser],'ebhubon')],
  controllers: [ SellersController],
  providers: [ SellersService,],
  exports: [SellersService]
})

export class SellersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(sellerCreateMiddleware)
      .forRoutes({path: 'sellers/registration',method:RequestMethod.POST});
      // consumer
      // .apply(sellerUpdateMiddleware)
      // .forRoutes({path: 'products/delete',method:RequestMethod.POST},
      // {path: 'products/update',method:RequestMethod.POST});

  //   consumer
  //   .apply(CatUpdatedMiddleware)
  //   .exclude(
  //   { path: 'cats/registration', method: RequestMethod.POST }
  //  )
  //  .forRoutes(CatsController);
  }
}