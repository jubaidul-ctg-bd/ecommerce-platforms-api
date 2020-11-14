import { ObjectID } from "typeorm";
import { Category } from "./category.entity";

export interface categoryinterface {
     _id: ObjectID;
     title: string;
     slug: string;
     order: string;
     status: string;
     parentCategories:string;
     banner: string;
     icon: string;
     image: string;
     parentId: string;
     createdAt: Date;
     createdBy: string;
     updatedAt: Date;
     updatedBy: string;
     children: Category[];
     Category: string;
     childCategories: Category[];
     parentCategory: Category;
     parentCategoryTitle: string;
     description: string;
}