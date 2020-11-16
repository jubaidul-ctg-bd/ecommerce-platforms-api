
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToOne, OneToMany, Tree, JoinTable, JoinColumn, TreeChildren, TreeParent, IsNull, BaseEntity, ManyToMany, Unique } from 'typeorm';

import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty, IsDefined, isInt, min, Allow} from "class-validator";
import { Product } from 'src/products/productSchema/products.entity';
import { Category } from './category.entity';

 


@Entity()
//@Unique("UQ_Category",["title"])
export class CategoryAttribute {
    @ObjectIdColumn()
    _id: ObjectID;

    @Allow()
    @ObjectIdColumn({ name: 'CCcategoryId' })
    categoryId: string;

    @Allow()
    @Column()
    attrTitle: string;

    @Allow()
    @Column()
    attrType: string;

    @Allow()
    @Column()
    attrOption: [];

    @Allow()
    @Column()
    createdAt: Date;

    @Allow()
    @Column()
    createdBy: string;

    @Allow()
    @Column()
    slug: string;

    @Allow()
    @Column()
    updatedAt: Date;

    @Allow()
    @Column()
    updatedBy: string;
    
    @Allow()
    @Column()
    Category: string;

    @Allow()
    @Column()
    categoriesId:[]
    
    // @ManyToOne(type => Category, category => category.categoryWiseAttrs)
    // categorys: Category;

    // @ManyToOne(type=>Product, products=>products.categories)
    // products:Product[];
    
}
