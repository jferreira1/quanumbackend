import { getRepository } from "typeorm";
import User from "../models/User";

export class DeleteUserService {
  async execute(id: string) {
    const repo = getRepository(User);

    if (!(await repo.findOne(id))) {
      return new Error("User doesn't exists");
    }

    await repo.delete(id);
  }
}
