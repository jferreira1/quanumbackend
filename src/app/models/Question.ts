import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer";
import { EvidencePlaceholder } from "./EvidencePlaceholder";

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
}
