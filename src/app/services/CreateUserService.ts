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

type UserResponse = {
  email: string;
  password?: string;
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
  }: UserRequest): Promise<UserResponse | Error> {
    const repo = getRepository(User);

    if (await repo.findOne({ email })) {
      return new Error("Email already registered");
    }

    const user = repo.create({
      email,
      password,
      firstname,
      lastname,
      occupation_role,
      type,
      avatar_url,
    });

    await repo.save(user);

    const userResponse: UserResponse = user;
    delete userResponse.password;

    return userResponse;
  }
}
