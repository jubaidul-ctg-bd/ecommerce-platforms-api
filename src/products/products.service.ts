import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'process';
import { Category } from 'src/category/categorySchema/category.entity';
import { Repository } from 'typeorm';
import { Product } from './productSchema/products.entity';
import {ObjectId,ObjectID as ObjID} from 'mongodb'
import { ProductDto } from './productSchema/product.dto';
@Injectable()
export class ProductsService {

    constructor( 
    @InjectRepository(Product,'ebhubon') private readonly productRepository: Repository<Product>,
    @InjectRepository(Category,'ebhubon') private readonly categoryRepository: Repository<Category>) {}

    
    async findAll(): Promise<Product[]> {
        let allProducts = await this.productRepository.find();
        return allProducts; 
      }



      async findCurrentSeller(decode: any): Promise<Product[]> {

        let allProducts = await this.productRepository.find({where:{sellerId: decode.sl}});
        console.log("ALL PRODUCTS=============",allProducts)
        return allProducts; 
      }

      async findspecific(username: string): Promise<Product> {
        const data = await this.productRepository.findOne({title:username});
        if (!data)
        {
            throw new HttpException('Not found',HttpStatus.NOT_FOUND)
        }
        return data
      }

      async delete(id: string) {
        console.log("ID==================",id)
        await this.productRepository.delete(id);
      }

      async create(data: ProductDto, decoded: any):Promise<any> {

        console.log(data.categories)
        if (data.categories){
          data.categoryId  =  (data.categories[data.categories.length-1])
          let productCategory = await this.categoryRepository.findOne(data.categoryId)
          data.categoryTitle = productCategory.title
          
        }
        else{
          data.categoryId = null
        }
        data.sellerId =  decoded.sl
        data.createdAt = new Date()
        data.createdBy = decoded.mail
        return await this.productRepository.save(data)

        
        // let lastidx = data.category[data.category.length-1]
        // console.log("LAST IDX VALUE==========", lastidx);

        // let datavalue= await this.categoryRepository.findOne({
        // where:{title:lastidx}})
        // console.log('category:',datavalue);
        // console.log('category ID========================:',datavalue._id);
        
        
        // data.categoryId = datavalue._id;
        // var temp = [] 
        

        // for(let i=0; i<data.category.length-1; i++)
        // {
        //   let name = data.category[i];
        //   console.log("CATEGORY NAME==========",data.category[i])
        //   const categoryID = await this.categoryRepository.findOne({
        //     where:{title:name}})
        //     temp[i] = String(categoryID._id)
            
        // }
        // data.category = Object (temp)
        // console.log(data.category.length);
        // //data.category.push(datavalue)
        // return  this.productRepository.save(data);
        // // await this.usersmRepository.save(data);
        // // return user;
        // //return user;
      }


      //update
      async update(data: any) {

        console.log("status", data["status"]);
        
        
        for (let key in data) {
            if (data.hasOwnProperty(key) && key!="status") {
                data[key].status = data["status"];
                data[key].updatedAt = new Date()
                data[key].updateBy = data.mail
                let _id  = data[key]._id;
                delete data[key]._id;
                let xup = await this.productRepository.update(_id, data[key]); 
            }
          }
          return data;
        // console.log("ID====================",_id);
        // await this.sellerinfoRepository.update({_id}, data); 
        // return await this.sellerinfoRepository.findOne(_id)
        //return this.sellerinfoRepository.update({_id}, data);
      }
      
}
