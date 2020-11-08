
import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Product {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    id: string;

    @IsNotEmpty()
    @Column()
    name : string;

    @IsNotEmpty()
    @Column()
    title: string;

    @Column()
    category: string;


    // @ObjectIdColumn()
    // categories_id: ObjectID;

    @ObjectIdColumn()
    categoryId: ObjectID;

    @IsNotEmpty()
    @Column()
    price: string;

    @IsNotEmpty()
    @Column()
    status: string;

    @IsNotEmpty()
    @Column()
    quantity: string;

    @Column()
    icon: string;

    @Column()
    image: string;

    @Column()
    banner: string;

    @Column()
    createdAt: string;

    @Column()
    createdBy: string;

    @Column()
    updatedAt: string;

    @Column()
    updatedBy: string;

    
    // @OneToMany(type=>category,category=>category._id)
    // @JoinTable()
    // category: category[];
    
}
