import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("questions_desc")
export class QuestionDescription {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  description: string;

  @Column("question_id")
  questionId: number;

  @Column("language_id")
  languageId: number;

  // Relations
}
