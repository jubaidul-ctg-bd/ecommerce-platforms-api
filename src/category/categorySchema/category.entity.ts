
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToOne, OneToMany, Tree, JoinTable, JoinColumn, TreeChildren, TreeParent, IsNull, BaseEntity, ManyToMany } from 'typeorm';

import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty, IsDefined, isInt, min} from "class-validator";

 


@Entity()
export class Category {
    // @PrimaryGeneratedColumn()
    // id: number
    

    

    @ObjectIdColumn()
    _id: ObjectID;


    @IsNotEmpty()
    @Column()
    title : string;
    @IsNotEmpty()
    @Column()
    slug: string;

    
    // @Column()
    // id: string;
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
    createdAt: string;

    @Column()
    createdBy: string;

    @Column()
    updatedAt: string;

    @Column()
    updatedBy: string;

    @ObjectIdColumn()
    parentId: ObjectID;

    @Column()
    children: Category[];


    @ManyToOne(type => Category, category => category.childCategories)
    parentCategory: Category;

    @OneToMany(type => Category, category => category.parentCategory)
    childCategories: Category[];
    
    @Column()
    Category: string;




    // @ManyToOne(type=>products, products=>products._id)
    // //@JoinTable()
    // products:products;
    
}
