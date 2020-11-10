
import { IsDefined, IsNotEmpty } from 'class-validator';
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import { StringDecoder } from 'string_decoder';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToMany, OneToMany, ManyToOne, BeforeInsert, Unique, Index } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique("UQ_EMAIL",["mail","cellNo"])
export class User {
  @ObjectIdColumn()
    _id: ObjectID;


  @IsNotEmpty()
  @Column()
  password: string;


  // @BeforeInsert()
  // async beforeInsert() {
  //   this.password = await bcrypt.hash(this.password, 12);
  // }

  @Column({ name : "cellNo"})
  @IsNotEmpty()
  cellNo: string;

  @Column({ name : "mail"})
  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  @Column()
  address: string;

  @IsNotEmpty()
  @Column()
  DOB: string;

  @Column()
  gender: string;

  @Column()
  nationality: string;

  @IsDefined()
  @Column({default:"user"})
  role: string;

  @Column()
  status: string;


  @Column()
  CreatedBy: string;

  @Column()
  CreatedAt: string;

  @Column()
  UpdatedBy: string;

  @Column()
  UpdatedAt: string;


  // @OneToMany(() => sellerUser, sellerUser => sellerUser._id)
  // public userId!: sellerUser[];

  
}