import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer";

@Entity("evidences")
export class Evidence {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  link: string;

  @ManyToMany(() => Answer, (answer) => answer.evidences)
  answers: Answer[];
}
