
import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/category/categorySchema/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Product {

    @ObjectIdColumn()
    _id: ObjectID;

    @IsNotEmpty()
    @Column()
    title: string;

    @Column()
    category: string;
    

    
    //@IsNotEmpty()
    @ObjectIdColumn()
    sellerId: ObjectID;

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
    categoryTitle: string;

    @Column()
    createdAt: string;

    @Column()
    createdBy: string;

    @Column()
    updatedAt: string;

    @Column()
    updatedBy: string;

    
    // @OneToMany(type=>Category, category=>category.products)
    // categories: Category;
    
}
