
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToOne, OneToMany, Tree, JoinTable, JoinColumn, TreeChildren, TreeParent, IsNull, BaseEntity, ManyToMany, Unique } from 'typeorm';

import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty, IsDefined, isInt, min} from "class-validator";
import { Product } from 'src/products/productSchema/products.entity';

 


@Entity()
@Unique("UQ_Category",["title"])
export class Category {
    // @PrimaryGeneratedColumn()
    // id: number

    @ObjectIdColumn()
    _id: ObjectID;

    @Column({name: "title"})
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    @Column()
    slug: string;

    @IsNotEmpty()
    @Column()
    order: string;

    @IsNotEmpty()
    @Column()
    status: string;

    @Column()
    banner: string;

    @Column()
    icon : string;

    @Column()
    image: string;

    @Column()
    createdAt: Date;

    @Column()
    createdBy: string;

    @Column()
    updatedAt: Date;

    @Column()
    updatedBy: string;

    @ObjectIdColumn({ name: 'parentId' })
    parentId: string;

    @Column()
    Category: string;

    @Column()
    parentCategoryTitle: string;

    @Column()
    description: string;

    @Column()
    children: Category[];

    @Column()
    parentCategories: [];

    @ManyToOne(type => Category, category => category.childCategories)
    parentCategory: Category;

    @OneToMany(type => Category, category => category.parentCategory)
    childCategories: Category[];

    // @ManyToOne(type=>Product, products=>products.categories)
    // products:Product[];
    
}
