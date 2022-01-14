import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Form } from "./Form";
import User from "./User";

export enum AuditType {
  INTERNAL = "internal",
  EXTERNAL = "external",
}

@Entity("audits")
export class Audit {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "name_institution" })
  nameInstitution: string;

  @Column({ name: "email_institution" })
  emailInstitution: string;

  @Column({ name: "phone_institution" })
  phoneInstitution: string;

  @Column({ name: "country_institution" })
  countryInstitution: string;

  @Column({ name: "city_institution" })
  cityInstitution: string;

  @Column({ name: "address_institution" })
  addressInstitution: string;

  @Column({
    type: "enum",
    enum: AuditType,
    default: AuditType.INTERNAL,
  })
  type: AuditType;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.audits)
  users: User[];

  @OneToMany(() => Form, (form) => form.audit)
  forms: Form[];
}

export default Audit;
