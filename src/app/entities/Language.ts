import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("languages")
export class Language {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 5, unique: true })
  shortname: string;

  @Column()
  name: string;
}
