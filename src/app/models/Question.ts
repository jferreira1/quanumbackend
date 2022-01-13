import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("form_id")
  formId: number;

  //Relations
}
