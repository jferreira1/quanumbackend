import { Request, Response } from "express";

import { getRepository } from "typeorm";

import User from "../entities/User";

class UserController {
  async list(req: Request, res: Response) {
    const repository = getRepository(User);
    const users = await repository.find();
    return res.send({ users });
  }

  async index(req: Request, res: Response) {
    const userId = req.params["userId"];
    const repository = getRepository(User);
    const users = await repository.findOne({ where: { id: userId } });
    if (!users) {
      return res.sendStatus(404);
    }
    return res.send({ users });
  }

  async store(req: Request, res: Response) {
    const {
      email,
      password,
      firstname,
      lastname,
      occupation_role,
      type,
      avatar_url,
    } = req.body;

    const repository = getRepository(User);
    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({
      email,
      password,
      firstname,
      lastname,
      occupation_role,
      type,
      avatar_url,
    });

    await repository.save(user);

    return res.json({
      email,
      firstname,
      lastname,
      occupation_role,
      type,
      avatar_url,
    });
  }
}

export default new UserController();
