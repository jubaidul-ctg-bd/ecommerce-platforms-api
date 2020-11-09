import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import { SellerUser } from 'src/sellers/sellerSchema/userSeller.entity';
import { User } from 'src/users/userSchema/user.entity';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({

    imports: [TypeOrmModule,TypeOrmModule.forFeature([Seller],'ebhubon'),TypeOrmModule.forFeature([SellerUser],'ebhubon'),
        MulterModule.register({
          // dest: 'upload',
        }),
    ],
    controllers: [ MediaController],
    providers: [ MediaService ],
    exports: [MediaService]
})
export class MediaModule {}
