import { getRepository } from "typeorm";
import User from "../models/User";

interface UserUpdateRequest {
  id: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  occupation_role?: string;
  avatar_url?: string;
}

export class UpdateUserService {
  async execute(id: string, userUpdateRequest: UserUpdateRequest) {
    const repo = getRepository(User);

    let user = await repo.findOne(id);

    if (!user) {
      return new Error("User does not exists");
    }

    user.email = userUpdateRequest.email ?? user.email;
    user.firstname = userUpdateRequest.firstname ?? user.firstname;
    user.lastname = userUpdateRequest.lastname ?? user.lastname;
    user.occupation_role =
      userUpdateRequest.occupation_role ?? user.occupation_role;
    user.avatar_url = userUpdateRequest.avatar_url ?? user.avatar_url;

    await repo.update(id, user);

    const userUpdated = await repo.findOne(id);
    return userUpdated;
  }
}
