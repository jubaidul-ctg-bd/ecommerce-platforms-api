
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToOne, OneToMany, Tree, JoinTable, JoinColumn, TreeChildren, TreeParent, IsNull, BaseEntity, ManyToMany, Unique } from 'typeorm';

import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty, IsDefined, isInt, min} from "class-validator";
import { Product } from 'src/products/productSchema/products.entity';

 


@Entity()
//@Unique("UQ_Category",["title"])
export class categoryWiseAttr {
    @ObjectIdColumn()
    _id: ObjectID;

    @ObjectIdColumn({ name: 'parentId' })
    productCategoryId: string;

    @Column()
    attrTitle: string;

    @Column()
    attrType: string;

    @Column()
    attrOption: [];

    @Column()
    createdAt: Date;

    @Column()
    createdBy: string;

    @Column()
    updatedAt: Date;

    @Column()
    updatedBy: string;

    

    
    

    // @ManyToOne(type=>Product, products=>products.categories)
    // products:Product[];
    
}
