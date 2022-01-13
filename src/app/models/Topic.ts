import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
