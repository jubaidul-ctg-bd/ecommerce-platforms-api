import { IsNotEmpty, IsDefined } from "class-validator";
import { ObjectID } from "typeorm";
import { Category } from "./category.entity";

export class categoryvalidator {
    
    id: string;
    
    title: string;
    slug: string;
    order: string;
    status: string;
    banner: string;
    icon: string;
    image: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;

    
    
    @IsDefined()
    parentId:ObjectID;
    parentCategory:Category;

}