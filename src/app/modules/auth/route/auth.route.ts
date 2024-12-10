import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { AuthController } from "../controller/auth.controller";
import { ValidateAuthUserViaZOD } from "../validation/auth.validation";

const router = Router();

router
  .route("/login")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.validateLoginUser),
    AuthController.loginValidation,
  );

router
  .route("/change-password")
  .post(
    authGuard(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.validatePreUser),
    AuthController.changePasswordValidation,
  );

router
  .route("/refresh-token")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.refreshTokenValidation),
    AuthController.refreshToken,
  );

router
  .route("/forget-password")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.forgetPasswordValidation),
    AuthController.forgetPassword,
  );

router
  .route("/reset-password")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.resetPasswordValidation),
    AuthController.resetPassword,
  );

export const AuthRoutes = router;
