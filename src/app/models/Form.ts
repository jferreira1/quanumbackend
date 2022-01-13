import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Name } from "./Name";

@Entity("forms")
export class Form {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column("audit_id")
  auditId: number;

  @Column("name_id")
  nameId: number;

  // Relations
  //@OneToMany()
  //names: Name[];
}
