
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToOne, OneToMany, Tree, JoinTable, JoinColumn, TreeChildren, TreeParent, IsNull, BaseEntity, ManyToMany, Unique } from 'typeorm';

import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty, IsDefined, isInt, min, Allow} from "class-validator";
import { Product } from 'src/products/productSchema/products.entity';
import { CategoryAttribute } from './categoryWiseAttr.entity';

 


@Entity()
@Unique("UQ_title",["title"])
@Unique("UQ_slug",["slug"])
export class Category {
    // @PrimaryGeneratedColumn()
    // id: number

    @ObjectIdColumn()
    _id: ObjectID;

    @Column({name: "title"})
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    @Allow()
    @Column({name: "slug"})
    slug: string;

    @Allow()
    @IsNotEmpty()
    @Column()
    order: string;

    @Allow()
    @IsNotEmpty()
    @Column()
    status: string;

    @Allow()
    @Column()
    banner: string;

    @Allow()
    @Column()
    icon : string;

    @Allow()
    @Column()
    image: string;

    @Allow()
    @Column()
    createdAt: Date;

    @Allow()
    @Column()
    createdBy: string;

    @Allow()
    @Column()
    updatedAt: Date;

    @Allow()
    @Column()
    updatedBy: string;

    @Allow()
    @ObjectIdColumn({ name: 'parentId' })
    parentId: string;

    @Allow()
    @Column()
    Category: string;

    @Allow()
    @Column()
    parentCategoryTitle: string;

    @Allow()
    @Column()
    description: string;

    @Allow()
    @Column()
    children: Category[];

    @Allow()
    @Column()
    parentCategories: [];

    @Allow()
    @ManyToOne(type => Category, category => category.childCategories)
    parentCategory: Category;

    @Allow()
    @OneToMany(type => Category, category => category.parentCategory)
    childCategories: Category[];

    // @ManyToOne(type=>Product, products=>products.categories)
    // products:Product[];

    // @OneToMany(type => CategoryAttribute, categoryWiseAttr => categoryWiseAttr.categorys)
    // categoryWiseAttrs: CategoryAttribute[];
    
    
}
