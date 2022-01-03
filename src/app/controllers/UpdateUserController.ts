import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;
    const {};
    const service = new UpdateUserService();
    const user = service.execute(userId, req.body);

    return res.json(user);
  }
}
