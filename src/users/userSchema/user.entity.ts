
import { IsDefined, IsNotEmpty } from 'class-validator';
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import { StringDecoder } from 'string_decoder';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToMany, OneToMany, ManyToOne, BeforeInsert, Unique, Index } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique("UQ_EMAIL",["mail"])
@Unique("UQ_cellNo",["cellNo"])
export class User {
  @ObjectIdColumn()
    _id: ObjectID;


  

  @Column()
  name: string;
  
  @Column()
  username: string;

  @IsNotEmpty()
  @Column()
  password: string;


  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  @Column({ name : "cellNo"})
  @IsNotEmpty()
  cellNo: string;

  @Column({ name : "mail"})
  @IsNotEmpty()
  mail: string;

  
  @Column()
  address: string;

  
  @Column()
  DOB: string;

  @Column()
  gender: string;

  @Column()
  nationality: string;

  
  @Column()
  role: string;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  createdBy: string;

  @Column()
  updatedAt: Date;

  @Column()
  updatedBy: string;



  // @OneToMany(() => sellerUser, sellerUser => sellerUser._id)
  // public userId!: sellerUser[];

  
}