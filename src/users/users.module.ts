import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './userSchema/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({

  imports: [forwardRef(() => AuthModule),TypeOrmModule,TypeOrmModule.forFeature([User],'ebhubon')],
  controllers: [ UsersController],
  providers: [ UsersService],
  exports: [UsersService]



})
export class UsersModule {}
