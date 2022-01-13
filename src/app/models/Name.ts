import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("names")
export class Name {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column("form_id")
  formId: number;

  @Column("language_id")
  languageId: number;

  //Relations
}
