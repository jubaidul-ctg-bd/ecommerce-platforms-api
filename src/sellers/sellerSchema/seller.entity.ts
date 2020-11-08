


import { StringDecoder } from 'string_decoder';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { IsDefined, IsNotEmpty } from 'class-validator'
import { User } from 'src/users/userSchema/user.entity';

@Entity()
export class Seller  {
  @ObjectIdColumn()
  _id: ObjectID;

  @IsDefined()
  @Column()
  shopName: string;

  @Column()
  address: string;

  @Column()
  CreatedBy: string;

  @Column()
  CreatedAt: string;

  @Column()
  UpdatedBy: string;

  @Column()
  UpdatedAt: string;

  @Column()
  status: string;


  // @ManyToMany(() => users)
  // @JoinTable()
  // users: users[];

  // @OneToOne(type=>users)
  // @JoinColumn()
  // user:users

  // @OneToMany(type=>users)
  // @JoinColumn()
  // user:users

  // @OneToOne(type=>sellerUser)
  // @JoinColumn()
  // sellerUser:sellerUser

}