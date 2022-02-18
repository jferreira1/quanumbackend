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

  //Relations
  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id" })
  question: Question;

  @ManyToOne(() => Language, { eager: true })
  @JoinColumn({ name: "language_id" })
  language: Language;
}
