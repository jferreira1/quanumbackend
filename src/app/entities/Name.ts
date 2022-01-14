import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Form } from "./Form";

@Entity("names")
export class Name {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column({ name: "form_id" })
  @JoinColumn({ name: "form_id" })
  formId: number;

  @Column({ name: "language_id" })
  languageId: number;

  //Relations
  @ManyToOne(() => Form)
  form: Form;
}
