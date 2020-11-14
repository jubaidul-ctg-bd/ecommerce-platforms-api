import { Body, Controller, Get, Param, Post,Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Product } from './productSchema/products.entity';
import { ProductsService } from './products.service';
import { compareSync } from 'bcrypt';
import jwt_decode from 'jwt-decode';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { ProductDto } from './productSchema/product.dto';
@Controller('product')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}

    @UseGuards(JwtAuthGuard)
    @Get('all')
    find(@Request() req): Promise<any> {
        return this.productService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('productForCurrentSeller')
    findCurrentSeller(@Request() req): Promise<any> {
        return this.productService.findCurrentSeller(req.user);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('specific/:id')
    findspecific(@Param() params): Promise<Product> {
        return this.productService.findbyid(params.id);
    }


    @UseGuards(JwtAuthGuard)
    @UsePipes(
        new ValidationPipe({
            whitelist: true
        }),
      )
    @Post('create')
    create(@Request() req, @Body() user: Product) {
        return this.productService.create(user,req.user);
    }


    @UseGuards(JwtAuthGuard)
    @Post('delete')
    delete(@Body() body) {
        console.log(body)
        return this.productService.delete(body.id);
    }


    @UseGuards(JwtAuthGuard)
    @Post('update')
    update(@Body() params) {
        return this.productService.update(params);
    }

}
