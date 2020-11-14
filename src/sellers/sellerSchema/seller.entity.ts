import { StringDecoder } from 'string_decoder';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToMany, Unique } from 'typeorm';
import { IsDefined, IsNotEmpty } from 'class-validator'
import { User } from 'src/users/userSchema/user.entity';


@Entity()
@Unique("UQ_Seller",["shopName"])
export class Seller  {
  @ObjectIdColumn()
  _id: ObjectID;


  @Column({name: "shopName"})
  @IsDefined()
  @IsNotEmpty()
  shopName: string;

  @Column()
  cellNo: string;

  @Column()
  mail: string;

  @Column()
  address: string;

  @Column()
  folderName: string;

  @Column()
  createdAt: Date;

  @Column()
  createdBy: string;

  @Column()
  updatedAt: Date;

  @Column()
  updatedBy: string;

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