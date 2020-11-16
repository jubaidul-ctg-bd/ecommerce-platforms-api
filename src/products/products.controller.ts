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

    
    @Get('all')
    find(@Request() req): Promise<any> {
        return this.productService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('productForCurrentSeller')
    findCurrentSeller(@Request() req): Promise<any> {
        return this.productService.findCurrentSeller(req.user);
    }

    
    //find a specific products
    @Get('specific/:id')
    findspecific(@Param('id') id): Promise<Product> {
        console.log(id)
        return this.productService.findspecific(id);
    }

    //find all similar products
    // @Get('specific/:id')
    // findspecific(@Param() params): Promise<Product> {
    //     console.log(params.id)
    //     return this.productService.findspecific(params.id);
    // }


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
        return this.productService.delete(body);
    }


    @UseGuards(JwtAuthGuard)
    @Post('update')
    update(@Body() params) {
        return this.productService.update(params);
    }

}
