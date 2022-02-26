import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { GetReportService } from "../../services/Audit/GetReportService";

export class GetReportController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const { auditId } = req.params;
      if (!auditId) throw new Error('"audit_id" was not provided.');
      const service = new GetReportService();
      const report = await service.getFormsReports(auditId);
      response = {
        success: true,
        data: report,
        message: "Report listado com sucesso!",
      };
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
    } finally {
      return res.json(response);
    }
  }
}
