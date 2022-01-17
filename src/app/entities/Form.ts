import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Audit from "./Audit";

@Entity("forms")
export class Form {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "form_number", unique: true })
  formNumber: string;

  // Relations
  @ManyToMany(() => Audit, (audit) => audit.forms)
  @JoinColumn({ name: "audit_id" })
  audit: Audit[];
}
