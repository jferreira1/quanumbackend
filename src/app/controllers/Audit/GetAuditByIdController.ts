import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { GetAuditByIdService } from "../../services/Audit/GetAuditByIdService";

export class GetAuditByIdController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { auditId } = req.params;

      if (!auditId) throw new Error('"audit_id" was not provided');

      const service = new GetAuditByIdService();
      const audit = await service.execute(auditId);

      // TO-DO: Implementar autenticação

      response = {
        success: true,
        data: audit,
        message: "Auditoria listada com sucesso!",
      };

      return res.json(response);
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    }
  }
}
