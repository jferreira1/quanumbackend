import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EvidencePlaceholder } from "./EvidencePlaceholder";
import { Form } from "./Form";
import { QuestionDescription } from "./QuestionDescription";
import { Topic } from "./Topic";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "question_number", unique: true })
  questionNumber: string;

  //Relations
  @ManyToOne(() => Form, { onDelete: "CASCADE" })
  @JoinColumn({ name: "form_id" })
  form: Form;

  @OneToMany(() => Topic, (topic) => topic.question)
  topics: Topic[];

  @OneToMany(() => QuestionDescription, (description) => description.question)
  descriptions: QuestionDescription[];

  @OneToMany(() => EvidencePlaceholder, (placeholder) => placeholder.question)
  placeholders: EvidencePlaceholder[];
}
