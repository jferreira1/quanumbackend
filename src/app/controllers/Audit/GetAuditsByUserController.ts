import { Request, Response } from "express";
import { GetAuditsByUserService } from "../../services/Audit/GetAuditsByUserService";

export class GetAuditsByUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.sendStatus(400);
    }

    const service = new GetAuditsByUserService();
    const response = await service.execute(userId);
    return res.json(response);
  }
}
