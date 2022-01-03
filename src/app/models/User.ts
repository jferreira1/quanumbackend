import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import bcrypt from "bcryptjs";

@Entity("users")
class User {
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

  @Column()
  type: string;

  @Column()
  avatar_url: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}

export default User;
