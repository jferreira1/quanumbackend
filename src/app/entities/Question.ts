import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { EvidencePlaceholder } from "./EvidencePlaceholder";
import { Form } from "./Form";
import { QuestionDescription } from "./QuestionDescription";
import { Topic } from "./Topic";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("form_id")
  formId: number;

  //Relations
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @OneToMany(
    () => EvidencePlaceholder,
    (evidencePlaceholder) => evidencePlaceholder.question
  )
  evidencePlaceholders: EvidencePlaceholder[];

  @OneToMany(
    () => QuestionDescription,
    (questionDescription) => questionDescription.question
  )
  descriptions: QuestionDescription[];

  @OneToMany(() => Topic, (topic) => topic.question)
  topics: Topic[];

  @ManyToOne(() => Form, (form) => form.questions)
  @JoinColumn({ name: "form_id" })
  form: Form;
}
