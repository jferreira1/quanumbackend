import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const {
      email,
      password,
      firstname,
      lastname,
      occupation_role,
      type,
      avatar_url,
    } = req.body;

    const service = new CreateUserService();
    const result = await service.execute({
      email,
      password,
      firstname,
      lastname,
      occupation_role,
      type,
      avatar_url,
    });

    if (result instanceof Error) {
      return res.status(409).json(result.message);
    }

    return res.json(result);
  }
}
