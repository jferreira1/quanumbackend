import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import Audit from "./Audit";
import { Evidence } from "./Evidence";
import { Question } from "./Question";
import User from "./User";

export enum ConformanceLevels {
  NA = "NA",
  ZERO = "0",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
}

@Entity("answers")
@Unique(["user", "audit", "question"])
export class Answer {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({
    name: "conformance_level",
    type: "enum",
    enum: ConformanceLevels,
    default: ConformanceLevels.NA,
  })
  conformanceLevel: ConformanceLevels;

  @Column("text")
  comment: string;

  //Relations

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Audit)
  @JoinColumn({ name: "audit_id" })
  audit: Audit;

  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id" })
  question: Question;

  @ManyToMany(() => Evidence)
  @JoinTable({
    name: "answers_evidences",
    joinColumn: {
      name: "answer_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "evidence_id",
      referencedColumnName: "id",
    },
  })
  evidences: Evidence[];
}
