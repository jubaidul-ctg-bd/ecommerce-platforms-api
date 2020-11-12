import { Body, Controller, Get, Param, Post,Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Product } from './productSchema/products.entity';
import { ProductsService } from './products.service';
import { compareSync } from 'bcrypt';
import jwt_decode from 'jwt-decode';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
@Controller('product')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}


    @UseGuards(JwtAuthGuard)
    @Get('all')
    find(@Request() req): Promise<any> {
       // console.log("REQUEST CALLED=================",req);
        
       // console.log(req.headers);
        return this.productService.findAll();
    }


    @UseGuards(JwtAuthGuard)
    @Get('productForCurrentSeller')
    findCurrentSeller(@Request() req): Promise<any> {
        // const header = req.headers.authorization
        // const decoded = jwt_decode(header);
        // console.log("PRODUCT CREATE==============",decoded)
        return this.productService.findCurrentSeller(req.user);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('specific/:id')
    findspecific(@Param() params): Promise<Product> {
        return this.productService.findbyid(params.id);
    }



    
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    create(@Request() req, @Body() user: Product):Promise<any> {
        console.log("product create called")
        // const header = req.headers.authorization
        // const decoded = jwt_decode(header);
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
        console.log("PRODUCT UPDATE CALLED===============",params)
        // console.log("asasdasdasdasd",params[0])
        // console.log(x.length)
        return this.productService.update(params);
    }






}
