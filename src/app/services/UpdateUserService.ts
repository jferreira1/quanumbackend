import { getRepository } from "typeorm";
import User, { UserType } from "../entities/User";

interface UserUpdateRequest {
  email?: string;
  firstname?: string;
  lastname?: string;
  occupation_role?: string;
  avatar_url?: string;
  type?: string;
}

export class UpdateUserService {
  async execute(
    id: string,
    userUpdateRequest: UserUpdateRequest
  ): Promise<User> {
    try {
      const repo = getRepository(User);
      let user = await repo.findOne(id);
      if (!user) throw new Error("User does not exists");

      user.email = userUpdateRequest.email ?? user.email;
      user.firstname = userUpdateRequest.firstname ?? user.firstname;
      user.lastname = userUpdateRequest.lastname ?? user.lastname;
      user.occupation_role =
        userUpdateRequest.occupation_role ?? user.occupation_role;
      user.avatar_url = userUpdateRequest.avatar_url ?? user.avatar_url;

      if (userUpdateRequest.type === "manager") {
        user.type = UserType.MANAGER;
      } else if (userUpdateRequest.type === "auditor") {
        user.type = UserType.AUDITOR;
      }

      await repo.update(id, user);

      const userUpdated = await repo.findOneOrFail(id);
      return userUpdated;
    } catch (err) {
      throw err;
    }
  }
}
