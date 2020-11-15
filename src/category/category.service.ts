import { Injectable } from '@nestjs/common';
import { Category } from './categorySchema/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,TreeRepository,getRepository, getMongoRepository ,ObjectID, createConnection, getConnectionManager} from 'typeorm';
import { Mongoose } from 'mongoose'
import { categoryinterface } from './categorySchema/category.interface';
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import {getConnection} from "typeorm";
import { userInfo } from 'os';
import { LOADIPHLPAPI } from 'dns';

import {ObjectId,ObjectID as ObjID} from 'mongodb'
import { async, empty } from 'rxjs';
import { User } from 'src/users/userSchema/user.entity';
import { categoryDto } from './categorySchema/category.dto';
import { ProductDto } from 'src/products/productSchema/product.dto';
import { isEmpty } from 'class-validator';
import { categoryAttrDto } from './categorySchema/categoryAttr.dto';

@Injectable()
export class CategoryService {
    constructor( 
    @InjectRepository(Category,'ebhubon') private readonly categoryRepository: Repository<Category>,
    ) {}

      async delete(id: string) {
        await this.categoryRepository.delete(id);
      }



    //find all the roots
    async findAll(): Promise<any> {
        let data=await this.categoryRepository.find()
        return data;
      }



      //find the entire sub-tree 
      async getChild(username: string): Promise<any>  {
        console.log(username);
        let data= await this.categoryRepository.findOne({
          where:{title:username},
        })
        console.log("Data==============", data);
        let pID = data._id;
        console.log(pID);
        const sub_category=await this.categoryRepository.find({
          where:{parentId:pID},
        })
        console.log("SUB CATEGORYS=============",sub_category);
        return sub_category;
        //await this.categoryRepository.delete(name);

        
      }

      //find entire category tree
      async getallChild(): Promise<any> {
        console.log("ALL CHILD CALLED")
        console.log("find all");
        let parent = await this.categoryRepository.find({
          where:{parentId:null},
        })
       
        //console.log("PARENT============",parent)
        for(let i=0; i<parent.length; i++)
        {
          parent[i].parentId = null;
          let child=await this.categoryRepository.find({
            where:{parentId:String(parent[i]._id)},
          })    
          //if child exist creating a new array for child
          if(Object.keys(child).length) parent[i].children=child;
          if(child!=null)
          {
             for(let j=0; j<child.length; j++)
             { 
              let subchild=await this.categoryRepository.find({
                where:{parentId:String(child[j]._id)},
              })
              if(Object.keys(subchild).length) child[j].children=subchild;
              if(subchild!=null)
              {
                 for(let k=0; k<subchild.length; k++)
                 { 
                  let subsubchild = await this.categoryRepository.find({
                    where:{parentId:String(subchild[k]._id)},
                  })
                  if(Object.keys(subsubchild).length) subchild[k].children=subsubchild;
                 }
              }
             }
          }
         
        }


        return parent;


        // return subtree;

        // const user = await getMongoRepository(category,'ebhubon')
        // .createQueryBuilder("user")
        // .where("user.id = :id", { id: null })
        // .getOne();
        // return user;
        //return this.categoryRepository.findOne({parentId: null});
      }
      
      // async createCategory(username: string, c_details: Category): Promise<Category> {
      //   console.log(username);
      //   let data= await this.categoryRepository.findOne({
      //     where:{title:username},
      //   })
       
      //   console.log("Data==============", data);
        
      //   let pID = data.parentId;

      //   console.log(pID);
      //   if(pID==null)
      //   {
          
      //     // var x = JSON.stringify(data)
      //     // console.log("JSON AS STRING===========",typeof x)
      //     // console.log("JSON AS STRING===========",x)
      //     // var x = JSON.parse(x)
      //     // console.log("JSON AS STRING===========",typeof x)
      //     // console.log("JSON AS STRING===========",Object(x.parentId))
      //     const categoryx = await  this.categoryRepository.save(c_details);
      //     return categoryx;
      //   }
      //   else
      //   {
      //     const categoryx = await  this.categoryRepository.save(c_details);
      //   }
      //   // const sub_category=await this.categoryRepository.find({
      //   //   where:{parentId:pID},
      //   // })

      //   console.log("SUB CATEGORYS=============",c_details);
      //   return c_details;
      //   //await this.categoryRepository.delete(name);

      //   return this.categoryRepository.findOne(username);
      // }

      
    

      // async create(data: any):Promise<any> {
      //     if (data.parentCategories){
      //     data.parentId = new ObjID (data.parentCategories[data.parentCategories.length-1])
      //   } else {
      //    data.parentId = null
      //   }
      //   const new_category = await  this.categoryRepository.save(data);
      //   return data;


      // }

      //creating fresh category
      async createcategory(data: categoryDto,mail :string ) {
        let createdCategory : Category
        try{
          console.log("ADDED CATEGORY DATA=================",data)
          console.log("parent Category =================",data.parentCategories)
          if (data.parentCategories){
            data.parentId  =  (data.parentCategories[data.parentCategories.length-1])
            let catId = await this.categoryRepository.findOne(data.parentId)
            data.parentCategoryTitle =  catId.title
          }
          else{
          data.parentId = null
          }
          data.createdAt = new Date()
          data.createdBy = mail
          createdCategory =  await this.categoryRepository.save(data)
        }catch(err) {
          return err.writeErrors[0].errmsg        
        }
        return  createdCategory
      }

      
      async showSubCategory(): Promise<any> {
        let parent=await this.categoryRepository.find({
          where:{parentId:null},
        })
        for(let i=0; i<parent.length; i++)
        {
          parent[i].parentId = null;
          let child=await this.categoryRepository.find({
            where:{parentId:String(parent[i]._id)},
          })    
          parent[i].children=child;
          if(child!=null)
          {
             for(let j=0; j<child.length; j++)
             { 
              let subchild=await this.categoryRepository.find({
                where:{parentId:String(child[j]._id)},
              })
              child[j].children=subchild;
             }
          }
        }
        return parent;
        
      }

      //update
      async updateList(data: any) {
        console.log("status", data["status"]);
        for (let key in data) {
            if (data.hasOwnProperty(key) && key!="status") {
                // data[key].status = data["status"];
                // data[key].updatedAt= new Date()
                // data[key].updatedBy = data.mail
                // // let sellerId = new sellers();
                // // sellerId._id =data[key]._id;
                // // sellerId._id = data[key]._id 
                // let _id  = data[key]._id;
                // // tmp = new ObjID(tmp)
                // console.log("_id",_id);
                // delete data[key]._id;
                // // let x = await this.sellerinfoRepository.update({_id}, data[key]); 
                // let x = await this.categoryRepository.findOne(_id); 
                // //delete x.shopName;
                // //delete x.role;
                // delete x.status;
                // //delete x.cellNo;
                // //delete x.mail;
                // console.log("x======",x);
                // let xup = await this.categoryRepository.update(x,data[key]); 
                // console.log("Vlaue=================",xup)
                data[key].status = data["status"];
                data[key].updatedAt = new Date()
                data[key].updateBy = data.mail
                let _id  = data[key]._id;
                delete data[key]._id;
                let xup = await this.categoryRepository.update(_id, data[key]);
            }
          }
          return data;
        // console.log("ID====================",_id);
        // await this.sellerinfoRepository.update({_id}, data); 
        // return await this.sellerinfoRepository.findOne(_id)
        //return this.sellerinfoRepository.update({_id}, data);
      }

      async update(data: Category) {
        let categoryID = data._id
        if (data.parentCategories){
          data.parentId  =  (data.parentCategories[data.parentCategories.length-1])
          let categoryTitle = (await this.categoryRepository.findOne(data.parentId)).title
          data.parentCategoryTitle =  categoryTitle
        }
        else{
          data.parentCategories = null 
          data.parentCategoryTitle = null
          data.parentId = null
        }
        delete data._id 
        let UpdatedData = await this.categoryRepository.update(categoryID,data); 
        return UpdatedData;
      }



      async attributeCreate(data: categoryAttrDto ) {
        return ;
      }

}
