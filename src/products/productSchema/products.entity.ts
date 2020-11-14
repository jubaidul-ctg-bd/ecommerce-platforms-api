
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
    
    @Column()
    categories: [];
    
    //@IsNotEmpty()
    @ObjectIdColumn({ name: 'sellerId' })
    sellerId: string;

    // @ObjectIdColumn()
    // categories_id: ObjectID;

    @ObjectIdColumn({ name: 'categoryId' })
    categoryId: string;

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
    createdAt: Date;

    @Column()
    createdBy: string;

    @Column()
    updatedAt: Date;

    @Column()
    updatedBy: string;

    @Column()
    mail: string;


    
    // @OneToMany(type=>Category, category=>category.products)
    // categories: Category;
    
}
