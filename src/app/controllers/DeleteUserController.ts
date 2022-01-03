import { Response, Request } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;
    const service = new DeleteUserService();
    const result = await service.execute(userId);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(200).end();
  }
}
