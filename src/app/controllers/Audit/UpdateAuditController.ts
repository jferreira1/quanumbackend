import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { UpdateAuditService } from "../../services/Audit/UpdateAuditService";

export class UpdateAuditController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { auditId: auditId } = req.params;
      if (!auditId) throw new Error("audit_id was not provided.");
      const service = new UpdateAuditService();
      const audit = await service.execute(auditId, req.body);
      response = {
        success: true,
        data: audit,
        message: "Auditoria atualizada com sucesso!",
      };
      return res.json(response);
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
      return res.json(response);
    }
  }
}
