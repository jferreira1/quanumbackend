import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Form } from "./Form";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "question_number", unique: true })
  questionNumber: string;

  //Relations
  @ManyToOne(() => Form)
  @JoinColumn({ name: "form_id" })
  form: Form;
}
