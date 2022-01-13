import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
