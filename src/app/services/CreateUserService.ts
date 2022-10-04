import { getRepository } from "typeorm";
import User, { UserType } from "../entities/User";

type UserRequest = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  occupation_role: string;
  type: string;
  avatar_url?: string;
};

type UserResponse = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  occupation_role: string;
  type: string;
  avatar_url?: string;
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

      if (await repo.findOne({ email }))
        throw new Error("Email already registered");

      let user = new User();
      user.email = email;
      user.password = password;
      user.firstname = firstname;
      user.lastname = lastname;
      user.occupation_role = occupation_role;
      user.type = UserType.AUDITOR;
      if (type && type === UserType.MANAGER) user.type = UserType.MANAGER;
      if (avatar_url) user.avatar_url = avatar_url;

      user = await repo.save(user);
      const userResponse: UserResponse = {
        id: String(user.id),
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar_url: user.avatar_url,
        occupation_role: user.occupation_role,
        type: user.type,
      };
      return userResponse;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }
}
