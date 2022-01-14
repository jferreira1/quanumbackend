import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Audit from "./Audit";
import { Name } from "./Name";
import { Question } from "./Question";

@Entity("forms")
export class Form {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column({ name: "audit_id" })
  auditId: number;

  // Relations
  @OneToMany(() => Name, (name) => name.form)
  names: Name[];

  @ManyToOne(() => Audit, (audit) => audit.forms)
  @JoinColumn({ name: "audit_id" })
  audit: Audit;

  @ManyToOne(() => Question, (question) => question.form)
  questions: Question[];
}
