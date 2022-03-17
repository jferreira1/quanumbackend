import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Language } from "./Language";
import { Question } from "./Question";

@Entity("questions_desc")
export class QuestionDescription {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  description: string;

  // Relations´
  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id" })
  question: Question;

  @ManyToOne(() => Language)
  @JoinColumn({ name: "language_id" })
  language: Language;
}
