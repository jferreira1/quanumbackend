import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  // Relations
  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id" })
  question: Question;

  @ManyToOne(() => Language, { eager: true })
  @JoinColumn({ name: "language_id" })
  language: Language;
}
