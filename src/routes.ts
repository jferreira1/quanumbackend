import { Router } from "express";

import authMiddleware from "./app/middlewares/authMiddleware";
import AuthController from "./app/controllers/AuthController";
import { CreateUserController } from "./app/controllers/CreateUserController";
import { GetAllUsersController } from "./app/controllers/GetAllUsersController";
import { DeleteUserController } from "./app/controllers/DeleteUserController";
import { UpdateUserController } from "./app/controllers/UpdateUserController";
import { CreateAuditController } from "./app/controllers/Audit/CreateAuditController";
import { GetAuditsByUserController } from "./app/controllers/Audit/GetAuditsByUserController";
import { DeleteAuditController } from "./app/controllers/Audit/DeleteAuditController";
import { UpdateAuditController } from "./app/controllers/Audit/UpdateAuditController";
import { GetAuditByIdController } from "./app/controllers/Audit/GetAuditByIdController";
import { GetUsersOfAuditController } from "./app/controllers/Audit/GetUsersOfAuditController";
import { GetFormsByAuditController } from "./app/controllers/Audit/GetFormsByAuditController";
import { GetQuestionsByFormController } from "./app/controllers/Audit/GetQuestionsByFormController";
import { CreateAnswersController } from "./app/controllers/Audit/CreateAnswersController";
import { UpdateAnswersController } from "./app/controllers/Audit/UpdateAnswersController";
import { GetAnswersController } from "./app/controllers/Audit/GetAnswersController";
import { GetReportController } from "./app/controllers/Audit/GetReportController";
import { GetUserController } from "./app/controllers/GetUserController";
import { GetAuditsTypesController } from "./app/controllers/Audit/GetAuditsTypesController";
import { GetUsersTypesController } from "./app/controllers/GetUsersTypesController";

const router = Router();

router.post("/v1/auth", AuthController.authenticate);
router.post("/v1/users", new CreateUserController().handle);
router.get("/v1/users", authMiddleware, new GetAllUsersController().handle);
router.get(
  "/v1/users/types",
  authMiddleware,
  new GetUsersTypesController().handle
);
router.get("/v1/users/:userId", authMiddleware, new GetUserController().index);
router.delete(
  "/v1/users/:userId",
  authMiddleware,
  new DeleteUserController().handle
);
router.patch(
  "/v1/users/:userId",
  authMiddleware,
  new UpdateUserController().handle
);
router.get(
  "/v1/users/:userId/audits",
  authMiddleware,
  new GetAuditsByUserController().handle
);
router.post("/v1/audits", authMiddleware, new CreateAuditController().handle);
router.get(
  "/v1/audits/types",
  authMiddleware,
  new GetAuditsTypesController().handle
);
router.get(
  "/v1/audits/:auditId",
  authMiddleware,
  new GetAuditByIdController().handle
);
router.patch(
  "/v1/audits/:auditId",
  authMiddleware,
  new UpdateAuditController().handle
);
router.delete(
  "/v1/audits/:auditId",
  authMiddleware,
  new DeleteAuditController().handle
);
router.get(
  "/v1/audits/:auditId/users",
  authMiddleware,
  new GetUsersOfAuditController().handle
);
router.get(
  "/v1/audits/:auditId/forms",
  authMiddleware,
  new GetFormsByAuditController().handle
);
router.get(
  "/v1/audits/:auditId/forms/:formId",
  authMiddleware,
  new GetQuestionsByFormController().handle
);

router.post(
  "/v1/audits/:auditId/forms/:formId/answers",
  authMiddleware,
  new CreateAnswersController().handle
);
router.put(
  "/v1/audits/:auditId/forms/:formId/answers",
  authMiddleware,
  new UpdateAnswersController().handle
);

router.get(
  "/v1/audits/:auditId/forms/:formId/answers",
  authMiddleware,
  new GetAnswersController().handle
);

router.get(
  "/v1/audits/:auditId/reports",
  authMiddleware,
  new GetReportController().handle
);

export default router;
