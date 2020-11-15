import { BaseEntity, ObjectID } from "typeorm";
import { Category } from "./category.entity";

export class categoryDto {
      _id: ObjectID;
      title: string;
      slug: string;
      order: string;
      status: string;
      parentCategories:[];
      banner: string;
      icon: string;
      image: string;
      parentCategoryTitle : string;
      description: string;
      parentId: string;
      createdAt: Date;
      createdBy: string;
      updatedAt: Date;
      updatedBy: string;
      children: Category[];
      Category: string;
      childCategories: Category[];
      parentCategory: Category;
}