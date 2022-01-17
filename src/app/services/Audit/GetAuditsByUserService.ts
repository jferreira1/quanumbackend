import { getRepository } from "typeorm";
import Audit from "../../entities/Audit";
import User from "../../entities/User";

export class GetAuditsByUserService {
  async execute(userId: string): Promise<any> {
    try {
      const repo = getRepository("audits");
      const audits = await repo
        .createQueryBuilder()
        .relation(User, "audits")
        .of(1)
        .loadMany();

      // TO-DO: adicionar scores
      //
      //

      return audits;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }
}
