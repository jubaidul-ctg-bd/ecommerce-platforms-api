import { Body, Controller, Get, Param, Post,Request } from '@nestjs/common';
import { Product } from './productSchema/products.entity';
import { ProductsService } from './products.service';
import { compareSync } from 'bcrypt';

@Controller('product')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}


    @Get('all')
    find(@Request() req): Promise<any> {
       // console.log("REQUEST CALLED=================",req);
        
       // console.log(req.headers);
        return this.productService.findAll();
    }

    @Get('specific/:id')
    findspecific(@Param() params): Promise<Product> {
        return this.productService.findbyid(params.id);
    }


    @Post('create')
    create(@Body() user: Product):Promise<any> {
        console.log("clalled mysql post")
        return this.productService.create(user);
    }

    @Post('delete')
    delete(@Body() body) {
        console.log(body)
        return this.productService.delete(body.id);
    }

    @Post('update')
    update(@Body() params) {
        console.log("PRODUCT UPDATE CALLED===============",params)
        // console.log("asasdasdasdasd",params[0])
        // console.log(x.length)
        return this.productService.update(params);
    }






}
