import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Language } from "./Language";
import { Question } from "./Question";

@Entity("topics")
export class Topic {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  topic: string;

  @Column("question_id")
  questionId: number;

  @Column("language_id")
  languageId: number;

  // Relations
  @ManyToOne(() => Question, (question) => question.topics)
  @JoinColumn({ name: "question_id" })
  question: Question;

  @OneToOne(() => Language)
  @JoinColumn({ name: "language_id" })
  language: Language;
}
