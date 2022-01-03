import { Router } from "express";

import authMiddleware from "./app/middlewares/authMiddleware";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import { CreateUserController } from "./app/controllers/CreateUserController";
import { GetAllUsersService } from "./app/services/GetAllUsersService";
import { GetAllUsersController } from "./app/controllers/GetAllUsersController";
import { DeleteUserController } from "./app/controllers/DeleteUserController";
import { UpdateUserController } from "./app/controllers/UpdateUserController";

const router = Router();

router.post("/v1/auth", AuthController.authenticate);
router.post("/v1/users", new CreateUserController().handle);
router.get("/v1/users", authMiddleware, new GetAllUsersController().handle);
router.get("/v1/users/:userId", authMiddleware, UserController.index);
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

export default router;
