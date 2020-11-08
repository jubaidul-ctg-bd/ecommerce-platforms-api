import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

import { AuthModule } from './users/auth/auth.module';
import { SellersController } from './sellers/sellers.controller';
import { SellersService } from './sellers/sellers.service';
import { SellersModule } from './sellers/sellers.module';

import { Connection } from 'typeorm';

import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';
import { MediaModule } from './media/media.module';
import { Category } from './category/categorySchema/category.entity';
import { Product } from './products/productSchema/products.entity';
import { Seller } from './sellers/sellerSchema/seller.entity';
import { SellerUser } from './sellers/sellerSchema/userSeller.entity';
import { User } from './users/userSchema/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        name:'ebhubon',
        useFactory: () => ({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'ebhubon',
        entities: [Category,User,Seller,Product,SellerUser],
        synchronize: false,
        useNewUrlParser: true,
        logging: true,
        //autoLoadEntities: true,
         useUnifiedTopology: true,
      }),
    }),
  //   TypeOrmModule.forRoot({
  //   name:'ebhubon',
  //   type: 'mongodb',
  //   host: 'localhost',
  //   port: 27017,
  //   database: 'ebhubon',
  //   entities: [proCategory,UserInfo,SellerInfo,prodetails],
  //   synchronize: false,
  //   useNewUrlParser: true,
  //   logging: true,
  //   //autoLoadEntities: true,
  //   useUnifiedTopology: true,
  // }),
  // TypeOrmModule.forRoot({
  //   name:'prodetail',
  //   type: 'mongodb',
  //   host: 'localhost',
  //   port: 27017,
  //   database: 'cats',
  //   entities: [prodetails],
  //   synchronize: true,
  //   useNewUrlParser: true,
  //   logging: true,
  //   //autoLoadEntities: true,
  //   useUnifiedTopology: true,
  // }),
  // TypeOrmModule.forRoot({
  //   name:'userdetails',
  //   type: 'mongodb',
  //   host: 'localhost',
  //   port: 27017,
  //   database: 'cats',
  //   entities: [UserInfo],
  //   synchronize: true,
  //   useNewUrlParser: true,
  //   logging: true,
  //   //autoLoadEntities: true,
  //   useUnifiedTopology: true,
  // }),
  // TypeOrmModule.forRoot({
  //   name:'sellerdetails',
  //   type: 'mongodb',
  //   host: 'localhost',
  //   port: 27017,
  //   database: 'cats',
  //   entities: [SellerInfo],
  //   synchronize: true,
  //   useNewUrlParser: true,
  //   logging: true,
  //   //autoLoadEntities: true,
  //   useUnifiedTopology: true,
  // }),
  TypeOrmModule.forFeature([Category ], 'ebhubon'),
  TypeOrmModule.forFeature([Product ], 'ebhubon'),
  TypeOrmModule.forFeature([User ], 'ebhubon'),
  TypeOrmModule.forFeature([Seller ], 'ebhubon'),
  TypeOrmModule.forFeature([SellerUser],'ebhubon'),
  CategoryModule, ProductsModule, UsersModule,AuthModule, SellersModule, MediaModule],
  controllers: [AppController, CategoryController, ProductsController, UsersController, SellersController, MediaController],
  providers: [AppService, CategoryService, ProductsService, UsersService,AuthModule, SellersService, MediaService],
  exports:[TypeOrmModule]
})
export class AppModule {
  
}