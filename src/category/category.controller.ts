import { Body, Controller, Get, Param, Post, UsePipes,Request, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './categorySchema/category.entity';
import { categoryinterface } from './categorySchema/category.interface';
import { ObjectID } from 'typeorm'
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import { categoryvalidator } from './categorySchema/validator.category';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { categoryDto } from './categorySchema/category.dto';
import {  } from './common/validation.pipe';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}


    //find all the roots 
    @UseGuards(JwtAuthGuard)
    @Get('all')
    find(): Promise<categoryinterface> {
        return this.categoryService.findAll();
    }

    //find entire category tree
    @UseGuards(JwtAuthGuard)
    @Get('allChild')
    getallChild(): Promise<categoryinterface> {
        return this.categoryService.getallChild();
    }



    //find the subdomain category
    // @UseGuards(JwtAuthGuard)
    // @Get('specific')
    // createCategory(@Param() params,@Body() user: Category) {
    //     return this.categoryService.createCategory(params.id,user);
    // }

    
    @UseGuards(JwtAuthGuard)
    @Get('get/:id')
    getChild(@Param() params ): Promise<prodetailsInterface>  {
        return this.categoryService.getChild(params.id);
    }



    @UseGuards(JwtAuthGuard)
    @UsePipes(
        new ValidationPipe({
            whitelist: true
        }),
      )
    @Post('createCategory')
    async createcategory(@Request() req,@Body() user: Category) {
        console.log("clalled mysql post")
        let newCategory : any = {}
        try{
            newCategory = this.categoryService.createcategory(user,req.user.mail);
        }catch(err){
            //console.log("ERROR================",err)
            return err;
        }
        return await newCategory
        //return this.categoryService.createcategory(user,req.user.mail);
    }

    @UseGuards(JwtAuthGuard)
    @Get('showParentCategory')
    showSubCategory(): Promise<categoryinterface> {
        return this.categoryService.showSubCategory();
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('delete')
    delete(@Body() body) {
        return this.categoryService.delete(body.id);
    }
    

    @UseGuards(JwtAuthGuard)
    @Post('update')
    update(@Body() params) {
        console.log("Seller CAlled===============",params)
        // console.log("asasdasdasdasd",params[0])
        // console.log(x.length)
        return this.categoryService.update(params);
    }


}
