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

@Entity("evidences_placeholder")
export class EvidencePlaceholder {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  placeholder: string;

  @Column({ name: "question_id" })
  questionId: number;

  @Column({ name: "language_id" })
  languageId: number;

  //Relations
  @ManyToOne(() => Question, (question) => question.evidencePlaceholders)
  @JoinColumn({ name: "question_id" })
  question: Question;

  @OneToOne(() => Language)
  @JoinColumn({ name: "language_id" })
  language: Language;
}
