import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'process';
import { Category } from 'src/category/categorySchema/category.entity';
import { Repository } from 'typeorm';
import { Product } from './productSchema/products.entity';

@Injectable()
export class ProductsService {

    constructor( 
    @InjectRepository(Product,'ebhubon') private readonly productRepository: Repository<Product>,
    @InjectRepository(Category,'ebhubon') private readonly categoryRepository: Repository<Category>) {}


    async findAll(): Promise<Product[]> {

        let allProducts = await this.productRepository.find();
        // var temp = [] 
        // var i=0;
        // for (let entry of allProducts) {
        //   console.log("OBJECT ==========",entry); 
        //   const categorytitle = await this.categoryRepository.findOne({
        //     where:{_id:entry._id}})
        //     console.log("PRODUCT CATEGORY===========",categorytitle)
        //     temp[i] = entry
        //     temp[i].categoryId = categorytitle.title
        //     i++
        // }
        // allProducts = Object (temp)
        // console.log(typeof allProducts)
        // console.log(allProducts);
        return allProducts; 
      }

      findbyid(username: string): Promise<Product> {
        return this.productRepository.findOne(username);
      }

      async delete(id: string) {
        await this.productRepository.delete(id);
      }

      async create(data: Product):Promise<Product> {
        //const user = this.usersRepository.create(data);
        console.log("clalled mysql add method called")
        console.log(data)
        console.log(data.category)
        console.log(typeof data.category)
        
        let lastidx = data.category[data.category.length-1]
        console.log("LAST IDX VALUE==========", lastidx);

        let datavalue= await this.categoryRepository.findOne({
        where:{title:lastidx}})
        console.log('category:',datavalue);
        console.log('category ID========================:',datavalue._id);
        
        
        data.categoryId = datavalue._id;
        var temp = [] 
        

        for(let i=0; i<data.category.length-1; i++)
        {
          let name = data.category[i];
          console.log("CATEGORY NAME==========",data.category[i])
          const categoryID = await this.categoryRepository.findOne({
            where:{title:name}})
            temp[i] = String(categoryID._id)
            
        }
        data.category = Object (temp)
        console.log(data.category.length);
        //data.category.push(datavalue)
        return  this.productRepository.save(data);
        // await this.usersmRepository.save(data);
        // return user;
        //return user;
      }


      //update
      async update(data: any) {

        console.log("status", data["status"]);
        
        
        for (let key in data) {
            if (data.hasOwnProperty(key) && key!="status") {
                data[key].status = data["status"];
                // let sellerId = new sellers();
                // sellerId._id =data[key]._id;
                // sellerId._id = data[key]._id 
                let _id  = data[key]._id;
                // tmp = new ObjID(tmp)
                console.log("_id",_id);
                delete data[key]._id;
                // let x = await this.sellerinfoRepository.update({_id}, data[key]); 
                let x = await this.productRepository.findOne(_id); 
                console.log("products===============",x)
                //delete x.shopName;
                //delete x.title;
                //delete x.createdAt;
                delete x.status;
                //delete x.cellNo;
                //delete x.mail;
                console.log("x======",x);

                let xup = await this.productRepository.update(x,data[key]); 
                console.log("Vlaue=================",xup)
            }
          }
          return data;
        // console.log("ID====================",_id);
        // await this.sellerinfoRepository.update({_id}, data); 
        // return await this.sellerinfoRepository.findOne(_id)
        //return this.sellerinfoRepository.update({_id}, data);
      }
      
}
