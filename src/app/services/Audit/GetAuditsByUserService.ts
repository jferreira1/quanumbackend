import { getRepository } from "typeorm";
import User from "../../entities/User";

export class GetAuditsByUserService {
  async execute(userId: string): Promise<any> {
    try {
      const repo = getRepository("audits");
      const audits = await repo
        .createQueryBuilder()
        .relation(User, "audits")
        .of(userId)
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
