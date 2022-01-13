import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  JoinTable,
  ManyToMany,
} from "typeorm";

import bcrypt from "bcryptjs";
import Audit from "./Audit";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "pw_hash", select: false })
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  occupation_role: string;

  @Column("type_of")
  type: string;

  @Column()
  avatar_url: string;

  @ManyToMany(() => Audit, (audit) => audit.users)
  @JoinTable({
    name: "audits_users",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  audits: Audit[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}

export default User;
