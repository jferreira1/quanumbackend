import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./Form";

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
  @ManyToOne(() => Form, (form) => form.names)
  form: Form;
}
