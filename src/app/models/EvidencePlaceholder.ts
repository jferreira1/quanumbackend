import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity("evidences_placeholder")
export class EvidencePlaceholder {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  placeholder: string;

  @Column("question_id")
  questionId: number;

  @Column("language_id")
  languageId: number;

  //Relations
  @ManyToOne(() => Question, (question) => question.evidencePlaceholders)
  @JoinColumn({ name: "question_id" })
  question: Question;
}
