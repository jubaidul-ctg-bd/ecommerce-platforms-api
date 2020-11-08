import { Injectable } from '@nestjs/common';
import { Category } from './categorySchema/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,TreeRepository,getRepository, getMongoRepository ,ObjectID, createConnection, getConnectionManager} from 'typeorm';
import { Mongoose } from 'mongoose'
import { categoryInterface } from './categorySchema/category.interface';
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import {getConnection} from "typeorm";
import { userInfo } from 'os';
import { LOADIPHLPAPI } from 'dns';

@Injectable()
export class CategoryService {
    constructor( @InjectRepository(Category,'ebhubon') private readonly categoryRepository: Repository<Category>,
      ) {}

      async delete(id: string) {
        await this.categoryRepository.delete(id);
      }



    //find all the roots
    async findAll(): Promise<any> {
        console.log("find all");
        let data=await this.categoryRepository.find()
        // console.log("ALL ROOT CATEGORIES==========",data)
        // console.log("TYPE OF THE OBJECT==========",typeof data)
        
      
        // for(let i=0; i<data.length; i++)
        // {
        //   data[i].parentId = null;
        //   //console.log("FIRST VALUE============", data[i].parentId);
        // }


        return data;
        const user = await getMongoRepository(Category,'ebhubon')
        .createQueryBuilder("user")
        .where("user.id = :id", { id: null })
        .getOne();
        return user;
        //return this.categoryRepository.findOne({parentId: null});
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
        let tree = []
        let subtree = []
        console.log("find all");

        let parent=await this.categoryRepository.find({
          where:{parentId:null},
        })
        
        console.log("PARENT============",parent)


        // function recursion() {
        // }

        for(let i=0; i<parent.length; i++)
        {
          parent[i].parentId = null;
          let child=await this.categoryRepository.find({
            where:{parentId:parent[i]._id},
          })    

          parent[i].children=child;
          
          if(child!=null)
          {
             for(let j=0; j<child.length; j++)
             { 
              let subchild=await this.categoryRepository.find({
                where:{parentId:child[j]._id},
              })
              child[j].children=subchild;

              if(subchild!=null)
              {
                 for(let k=0; k<subchild.length; k++)
                 { 
                  let subsubchild = await this.categoryRepository.find({
                    where:{parentId:subchild[k]._id},
                  })
                  subchild[k].children=subsubchild;
                 }
              }
             }
          }

          // subtree.concat(child)
          // console.log(child)
          // //console.log("FIRST VALUE============", data[i].parentId);
          // //for(let j=0; j)
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
      


      async createCategory(username: string, c_details: Category): Promise<Category> {
        console.log(username);
        let data= await this.categoryRepository.findOne({
          where:{title:username},
        })
       
        console.log("Data==============", data);
        
        let pID = data.parentId;

        console.log(pID);
        if(pID==null)
        {
          
          // var x = JSON.stringify(data)
          // console.log("JSON AS STRING===========",typeof x)
          // console.log("JSON AS STRING===========",x)
          // var x = JSON.parse(x)
          // console.log("JSON AS STRING===========",typeof x)
          // console.log("JSON AS STRING===========",Object(x.parentId))
          const categoryx = await  this.categoryRepository.save(c_details);
          return categoryx;
        }
        else
        {
          const categoryx = await  this.categoryRepository.save(c_details);
        }
        // const sub_category=await this.categoryRepository.find({
        //   where:{parentId:pID},
        // })

        console.log("SUB CATEGORYS=============",c_details);
        return c_details;
        //await this.categoryRepository.delete(name);

        return this.categoryRepository.findOne(username);
      }

      async findbyroot(): Promise<Category> {
        console.log("FINDROOT FUNCTION========")
        
        //console.log(user);
        // const user = await getRepository(proCategory)
        // .createQueryBuilder()
        // .select("pro_category")
        // .from(proCategory, "pro_category")
        // .where("pro_category.id = :id", { parentId: null })
        
       return ;
      }
    

      async create(data: any):Promise<any> {
        //const user = this.usersRepository.create(data);
        // console.log("clalled mysql add method called")
        console.log(data)
       
        // console.log('parent id=============: ',data.parentId);
        
        // console.log('parent id type=============: ',typeof (data.parentId));
        // console.log('parent category=================',data.parentCategory);
        
        
          // var pCategory= await this.categoryRepository.findOne(data.parentId);
          // console.log("PARENT DATA==================",pCategory);
          if (data.parentCategories.length){
          data.parentId = data.parentCategories[data.parentCategories.length-1]
          // let user = new Category();
          // user.parentId=data.parentId;
          // user.slug=data.slug;
          // user.status=data.status;
          // user.title=data.title;
          // user.icon = data.icon;
          // user.image = data.image;
          // user.banner = data.banner;
          // user.order = data.order;

          // var x = JSON.stringify(data)
          // console.log("JSON AS STRING===========",typeof x)
          // console.log("JSON AS STRING===========",x)
          // var x = JSON.parse(x)
          // console.log("JSON AS STRING===========",typeof x)
          // console.log("JSON AS STRING===========",Object(x.parentId))


          const categoryx = await  this.categoryRepository.save(data);
         // data.parentCategory=pCategory;
          // delete data.parentId;
          return data;
        }
        
        
        
        data.parentId = null
        const new_category = await  this.categoryRepository.save(data);
        return data;

        // console.log("CATEGORY CREATED =========",category)
        
        // if( pCategory &&  data.parentId){
        //   console.log("CONFIRM HAVING ")
        //   if(!pCategory.childCategories || !pCategory.childCategories.length){
        //     pCategory.childCategories=[];
        //   }
        //    //pCategory.childCategories.push(category);
          
        //   console.log('pcategory id: ',pCategory._id);
        //   await this.categoryRepository.update(pCategory._id,pCategory)
        // }
        
        ///return await this.categoryRepository.findOne(pCategory._id);
        


      }

      async createcategory(data: any):Promise<any> {
        //const user = this.usersRepository.create(data);
        console.log("clalled mysql add method called")
        console.log(data)
        console.log(data.parentCategories)
        if (data.parentCategories.length){
          data.parentId = data.parentCategories[data.parentCategories.length-1]
        }
        else{
        data.parentId = null
        }
        const new_category = await  this.categoryRepository.save(data);
        return data;
      }

      
      async showSubCategory(): Promise<any> {
        console.log("creating categories ");
        let parent=await this.categoryRepository.find({
          where:{parentId:null},
        })
        
        console.log("PARENT============",parent)


        // function recursion() {
        // }

        for(let i=0; i<parent.length; i++)
        {
          parent[i].parentId = null;
          let child=await this.categoryRepository.find({
            where:{parentId:parent[i]._id},
          })    

          parent[i].children=child;
          
          if(child!=null)
          {
             for(let j=0; j<child.length; j++)
             { 
              let subchild=await this.categoryRepository.find({
                where:{parentId:child[j]._id},
              })
              child[j].children=subchild;
             }
          }

          // subtree.concat(child)
          // console.log(child)
          // //console.log("FIRST VALUE============", data[i].parentId);
          // //for(let j=0; j)
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



      //update
      async update(data: any) {

        console.log("status", data["status"]);
        
        
        for (let key in data) {
            if (data.hasOwnProperty(key) && key!="status") {
                data[key].status = data["status"];
                data[key].updatedAt= new Date()
                

                // let sellerId = new sellers();
                // sellerId._id =data[key]._id;
                // sellerId._id = data[key]._id 
                let _id  = data[key]._id;
                // tmp = new ObjID(tmp)
                console.log("_id",_id);
                delete data[key]._id;
                // let x = await this.sellerinfoRepository.update({_id}, data[key]); 
                let x = await this.categoryRepository.findOne(_id); 
                //delete x.shopName;
                //delete x.role;
                delete x.status;
                //delete x.cellNo;
                //delete x.mail;
                console.log("x======",x);

                let xup = await this.categoryRepository.update(x,data[key]); 
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
