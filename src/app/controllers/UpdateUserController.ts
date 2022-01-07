import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) {
      return res.sendStatus(400);
    }

    try {
      const service = new UpdateUserService();
      const response = await service.execute(userId, req.body);

      if (response instanceof Error) {
        return res.status(400).json(response.message);
      }

      return res.json(response);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
}
