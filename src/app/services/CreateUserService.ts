import { getRepository } from "typeorm";
import User, { UserType } from "../entities/User";

type UserRequest = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  occupation_role: string;
  user_type: string;
  avatar_url: string;
};

export class CreateUserService {
  async execute({
    email,
    password,
    firstname,
    lastname,
    occupation_role,
    user_type,
    avatar_url,
  }: UserRequest) {
    try {
      const repo = getRepository(User);

      if (await repo.findOne({ email }))
        throw new Error("Email already registered");

      const user = new User();
      user.email = email;
      user.password = password;
      user.firstname = firstname;
      user.lastname = lastname;
      user.occupation_role = occupation_role;
      if (user_type === UserType.AUDITOR) user.type = UserType.AUDITOR;
      if (user_type === UserType.MANAGER) user.type = UserType.MANAGER;
      user.avatar_url = avatar_url;

      const userResponse = await repo.save(user);
      return userResponse;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }
}
