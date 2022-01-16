import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Form } from "./Form";
import { Language } from "./Language";

@Entity("names")
export class Name {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  //Relations
  @ManyToOne(() => Form)
  @JoinColumn({ name: "form_id" })
  form: Form;

  @ManyToOne(() => Language)
  @JoinColumn({ name: "language_id" })
  language: Language;
}
