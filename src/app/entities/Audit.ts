import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
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

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => User, (user) => user.audits, { eager: true })
  users: User[];

  @ManyToMany(() => Form, (form) => form.audit, { eager: true })
  @JoinTable({
    name: "audits_forms",
    joinColumn: {
      name: "audit_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "form_id",
      referencedColumnName: "id",
    },
  })
  forms: Form[];
}

export default Audit;
