
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToOne, OneToMany, Tree, JoinTable, JoinColumn, TreeChildren, TreeParent, IsNull, BaseEntity, ManyToMany, Unique } from 'typeorm';


export class categoryAttrDto {
    _id: ObjectID;
    categoryId: string;
    attrTitle: string;
    attrType: string;
    attrOption: [];
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    Category:string;
    categoriesId:[];
    
}
