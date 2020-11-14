import { ObjectID } from "typeorm";

export class ProductDto {
    _id: ObjectID;
    title: string;
    category: string;
    categories: [];
    sellerId: string;
    categoryId: string;
    price: string;
    status: string;
    quantity: string;
    icon: string;
    image: string;
    banner: string;
    categoryTitle: string;
    createdAt: Date;
    createdBy: string;  
    updatedAt: Date;
    updatedBy: string;
    mail: string;
}