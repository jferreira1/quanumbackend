import { getRepository } from "typeorm";
import User from "../entities/User";

type UserRequest = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  occupation_role: string;
  type: string;
  avatar_url: string;
};

export class CreateUserService {
  async execute({
    email,
    password,
    firstname,
    lastname,
    occupation_role,
    type,
    avatar_url,
  }: UserRequest) {
    try {
      const repo = getRepository(User);

      if (await repo.findOne({ email })) {
        throw new Error("Email already registered");
      }

      let user = repo.create({
        email,
        password,
        firstname,
        lastname,
        occupation_role,
        type,
        avatar_url,
      });

      user = await repo.save(user);

      return user;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }
}
