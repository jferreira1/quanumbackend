import { getRepository } from "typeorm";
import Audit, { AuditType } from "../../entities/Audit";

type AuditRequest = {
  name_institution: string;
  postal_address: string;
  city: string;
  country: string;
  main_contact: string;
  phone_number: string;
  audit_type: string;
  auditors: [];
};

export class CreateAuditService {
  async execute({
    name_institution,
    postal_address,
    city,
    country,
    main_contact,
    phone_number,
    audit_type,
    auditors,
  }: AuditRequest): Promise<Audit | undefined> {
    try {
      const repo = getRepository("audits");
      const audit = new Audit();
      audit.nameInstitution = name_institution;
      audit.addressInstitution = postal_address;
      audit.cityInstitution = city;
      audit.countryInstitution = country;
      audit.emailInstitution = main_contact;
      audit.phoneInstitution = phone_number;
      audit.type = AuditType.INTERNAL;
      audit.users = auditors;

      // TO-DO: Vincular forms

      const auditResponse = repo.save(audit);

      return auditResponse;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }
}
