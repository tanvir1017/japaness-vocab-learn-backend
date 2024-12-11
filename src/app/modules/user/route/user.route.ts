import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { AdminValidationViaZod } from "../../admin/validation/admin.validation";
import { LernerValidationViaZod } from "../../lerner/validation/lerner.validation";
import { USER_ROLE } from "../constant/user.constant";
import { UserControllers } from "../controller/user.controller";

const router = Router();

// TODO => Create an admin
router.route("/create-admin").post(
  // * client data validation or sanitization 👌
  sanitizeClientDataViaZod(AdminValidationViaZod.createAdminValidationSchema),

  // * Calling Service
  UserControllers.createAdmin,
);

// TODO => Create a lerner
router.route("/create-lerner").post(
  // * client data validation or sanitization 👌
  sanitizeClientDataViaZod(LernerValidationViaZod.createLernerValidationSchema),

  // * Calling Service
  UserControllers.createLerner,
);

// TODO => Find only yourself
router
  .route("/me")
  .get(authGuard(USER_ROLE.admin, USER_ROLE.lerner), UserControllers.getMe);

// TODO => change user status
router
  .route("/:id/change-status")
  .post(authGuard(USER_ROLE.admin), UserControllers.changeStatus);

export const UserRoutes = router;
