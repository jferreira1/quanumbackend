import { getRepository } from "typeorm";
import Audit, { AuditType } from "../../entities/Audit";
import ResponseFormat from "../../interfaces/ResponseFormat";

interface AuditUpdateRequest {
  name_institution?: string;
  postal_address?: string;
  city: string;
  country: string;
  main_contact: string;
  phone_number: string;
  audit_type: AuditType;
  auditors: [];
}

export class UpdateAuditService {
  async execute(auditId: string, auditUpdateRequest: AuditUpdateRequest) {
    try {
      const repo = getRepository(Audit);
      let audit = await repo.findOne(auditId);
      if (!audit) throw new Error("Audit does not exists.");

      audit.id = Number(auditId);
      audit.nameInstitution =
        auditUpdateRequest.name_institution ?? audit.nameInstitution;
      audit.addressInstitution =
        auditUpdateRequest.postal_address ?? audit.addressInstitution;
      audit.cityInstitution = auditUpdateRequest.city ?? audit.cityInstitution;
      audit.countryInstitution =
        auditUpdateRequest.country ?? audit.countryInstitution;
      audit.emailInstitution =
        auditUpdateRequest.main_contact ?? audit.emailInstitution;
      audit.phoneInstitution =
        auditUpdateRequest.phone_number ?? audit.phoneInstitution;
      audit.type = auditUpdateRequest.audit_type ?? audit.type;
      audit.users = auditUpdateRequest.auditors ?? audit.users;

      const auditUpdated = await repo.save(audit);

      return auditUpdated;
    } catch (err) {
      throw err;
    }
  }
}
