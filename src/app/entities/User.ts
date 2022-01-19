import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";

import bcrypt from "bcryptjs";
import Audit from "./Audit";
import { Answer } from "./Answer";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  email: string;

  @Column({ name: "pw_hash", select: false })
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  occupation_role: string;

  @Column({ name: "type_of" })
  type: string;

  @Column()
  avatar_url: string;

  //Relations
  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @ManyToMany(() => Audit, (audit) => audit.users)
  @JoinTable({
    name: "audits_users",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "audit_id",
      referencedColumnName: "id",
    },
  })
  audits: Audit[];

  //Methods
  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}

export default User;