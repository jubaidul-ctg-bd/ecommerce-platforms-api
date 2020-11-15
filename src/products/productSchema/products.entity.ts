
import { Allow, IsNotEmpty } from 'class-validator';
import { Category } from 'src/category/categorySchema/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Product {

    @ObjectIdColumn()
    _id: ObjectID;

    @Allow()
    @IsNotEmpty()
    @Column()
    title: string;

    @Allow()
    @Column()
    category: string;
    
    @Allow()
    @Column()
    categories: [];
    
    //@IsNotEmpty()
    @Allow()
    @ObjectIdColumn({ name: 'sellerId' })
    sellerId: string;

    // @ObjectIdColumn()
    // categories_id: ObjectID;

    @Allow()
    @ObjectIdColumn({ name: 'categoryId' })
    categoryId: string;

    @IsNotEmpty()
    @Allow()
    @Column()
    price: string;

    @IsNotEmpty()
    @Allow()
    @Column()
    status: string;

    @IsNotEmpty()
    @Column()
    quantity: string;

    @Allow()
    @Column()
    icon: string;

    @Allow()
    @Column()
    image: string;

    @Allow()
    @Column()
    banner: string;

    @Allow()
    @Column()
    categoryTitle: string;

    @Allow()
    @Column()
    description: string;

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
    @Column()
    mail: string;


    
    // @OneToMany(type=>Category, category=>category.products)
    // categories: Category;
    
}
