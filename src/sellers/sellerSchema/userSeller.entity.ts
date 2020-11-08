
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, OneToMany, ManyToOne } from 'typeorm';

@Entity({'name':"sellerUsers"})
export class SellerUser{

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    userId: string;

    @Column()
    sellerId: string;
    
    @Column()
    createdAt: string;

    @Column()
    createdBy: string;

    @Column()
    updatedAt: string;

    @Column()
    updatedBy: string;

    
    // @OneToMany( ()=> sellers, sellers=>sellers._id)
    // seller : sellers

    // @OneToMany( ()=> users, user=>user._id)
    // user : users


    // @ManyToOne(() => sellers, sellers => sellers._id)
    // public seller!: sellers;

    // @ManyToOne(() => users, user => user._id)
    // public user!: users;
}
