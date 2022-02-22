import { Request, response, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { GetFormsByAuditService } from "../../services/Audit/GetFormsByAuditService";

export class GetFormsByAuditController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { auditId } = req.params;
      if (!auditId) throw new Error('"audit_id" was not provided.');
      const service = new GetFormsByAuditService();
      const forms = await service.execute(auditId);
      response = {
        success: true,
        data: forms,
        message: "Formulários listados com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }
}
