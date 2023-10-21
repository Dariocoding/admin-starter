import { ApiProperty } from "@nestjs/swagger";
import { EXAMPLE_UUID } from "src/common/utils/consts";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ValidRol, ValidRoles } from "@teslo/interfaces";

@Entity("users")
export class User {
  @ApiProperty({ example: EXAMPLE_UUID })
  @PrimaryGeneratedColumn()
  iduser?: string;

  @ApiProperty({ example: "test1@gmail.com" })
  @Column("text", { unique: true })
  email?: string;

  @ApiProperty({ example: "1023602106201" })
  @Column("text", { nullable: true })
  phone?: string;

  @ApiProperty({ example: "Dario" })
  @Column("text", { nullable: true })
  firstName?: string;

  @ApiProperty({ example: "Flores" })
  @Column("text", { nullable: true })
  lastName?: string;

  @ApiProperty({ example: "password" })
  @Column("text", { select: false })
  password?: string;

  @ApiProperty()
  @Column("bool", { default: true, nullable: false })
  isActive?: boolean;

  @ApiProperty()
  @Column("text", { nullable: true })
  token?: string;

  @ApiProperty({})
  @Column("simple-array", { default: [ValidRoles.USER] })
  roles?: ValidRol[];

  @CreateDateColumn({
    name: "date_created",
  })
  dateCreated?: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert?() {
    if (this.email) {
      this.email = this.email.toLowerCase().trim();
    }
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate?() {
    this.checkFieldsBeforeInsert();
  }
}
