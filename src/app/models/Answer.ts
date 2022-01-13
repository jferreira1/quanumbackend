import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Evidence } from "./Evidence";
import { Question } from "./Question";
import User from "./User";

export enum ConformanceLevels {
  NA = "Not Applicable",
  ZERO = "0",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
}

@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    name: "conformance_level",
    type: "enum",
    enum: ConformanceLevels,
    default: ConformanceLevels.NA,
  })
  conformanceLevel: ConformanceLevels;

  @Column("text")
  comment: string;

  @Column("user_id")
  userId: number;

  @Column("question_id")
  questionId: number;

  //Relations

  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: "question_id" })
  question: Question;

  @ManyToMany(() => Evidence, (evidence) => evidence.answers)
  @JoinTable({
    name: "answers_evidences",
    joinColumn: {
      name: "answer_id",
      referencedColumnName: "id",
    },
  })
  evidences: Evidence[];
}
