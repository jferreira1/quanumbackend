import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import User from "./User";

export enum AuditType {
  INTERNAL = "internal",
  EXTERNAL = "external",
}

@Entity("audits")
export class Audit {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("name_institution")
  nameInstitution: string;

  @Column("email_institution")
  emailInstitution: string;

  @Column("phone_institution")
  phoneInstitution: string;

  @Column("country_institution")
  countryInstitution: string;

  @Column("city_institution")
  cityInstitution: string;

  @Column("address_institution")
  addressInstitution: string;

  @Column({
    type: "enum",
    enum: AuditType,
    default: AuditType.INTERNAL,
  })
  type: AuditType;

  @CreateDateColumn("created_at")
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.audits)
  users: User[];
}

export default Audit;
