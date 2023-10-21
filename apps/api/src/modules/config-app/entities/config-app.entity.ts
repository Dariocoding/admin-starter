import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConfigApp {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    name: "colors-admin",
    type: "text",
    nullable: true,
    default: "{}",
    transformer: {
      from: (value: string) => {
        if (typeof value === "string") return JSON.parse(value);
        return JSON.stringify(value);
      },
      to: (value: Object) => JSON.stringify(value),
    },
  })
  colorsAdmin: Object;

  @ApiProperty()
  @Column({ nullable: true, type: "int" })
  emailPort: number;

  @ApiProperty()
  @Column({ nullable: true, default: "" })
  emailHost: string;

  @ApiProperty()
  @Column({ nullable: true, default: "" })
  emailUser: string;

  @ApiProperty()
  @Column({ nullable: true, default: "" })
  emailPassword: string;

  @ApiProperty()
  @Column({ nullable: true, default: "" })
  emailFrom: string;

  @ApiProperty()
  @Column({ nullable: true, default: "" })
  emailName: string;

  @ApiProperty()
  @Column({ nullable: true, default: "" })
  emailSecure: string;
}
