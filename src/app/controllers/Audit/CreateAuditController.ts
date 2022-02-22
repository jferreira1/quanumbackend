import { Request, Response } from "express";
import ResponseFormat from "../../interfaces/ResponseFormat";
import { CreateAuditService } from "../../services/Audit/CreateAuditService";

export class CreateAuditController {
  async handle(req: Request, res: Response) {
    let response: ResponseFormat = {
      success: false,
      data: null,
      message: "",
    };
    try {
      const {
        name_institution,
        postal_address,
        city,
        country,
        main_contact,
        phone_number,
        audit_type,
        auditors,
      } = req.body;

      const service = new CreateAuditService();
      const audit = await service.execute({
        name_institution,
        postal_address,
        city,
        country,
        main_contact,
        phone_number,
        audit_type,
        auditors,
      });

      response = {
        success: true,
        data: audit,
        message: "Auditoria cadastrada com sucesso!",
      };
      res.json(response);
    } catch (err) {
      if (err instanceof Error) response.message = err.message;
      return res.json(response);
    }
  }
}
