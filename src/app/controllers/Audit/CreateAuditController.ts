import { Request, Response } from "express";
import { CreateAuditService } from "../../services/Audit/CreateAuditService";

export class CreateAuditController {
  async handle(req: Request, res: Response) {
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
    const response = await service.execute({
      name_institution,
      postal_address,
      city,
      country,
      main_contact,
      phone_number,
      audit_type,
      auditors,
    });

    res.json(response);
  }
}
