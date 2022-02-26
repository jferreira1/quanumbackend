import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { GetAuditsByUserService } from "../../services/Audit/GetAuditsByUserService";

export class GetAuditsByUserController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new Error('Parameter "user_id" not provided');
      }
      const service = new GetAuditsByUserService();
      const audits = await service.execute(userId);
      response = {
        success: true,
        data: audits,
        message: "Auditorias listadas com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      console.log(response);
      return res.json(response);
    }
  }
}
