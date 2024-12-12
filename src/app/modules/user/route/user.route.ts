import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { UserControllers } from "../controller/user.controller";
import { UserSchemaValidationZOD } from "../validation/user.validation";

const router = Router();

// TODO => Find only yourself
router.route("/all").get(UserControllers.getAllUsers);

router.route("/email/:email").get(UserControllers.getSingleUserByMail);
// TODO => Update User
router.route("/:id").get(UserControllers.getSingleUser);

// TODO => Create a lerner
router.route("/create-user").post(
  // * client data validation or sanitization 👌
  sanitizeClientDataViaZod(UserSchemaValidationZOD.createUserValidationSchema),
  UserControllers.createUser,
);

// TODO => Update User
router.route("/:id/update").patch(
  // * client data validation or sanitization 👌
  sanitizeClientDataViaZod(UserSchemaValidationZOD.updateUserValidationSchema),
  UserControllers.updateUser,
);

// TODO => Delete User
router.route("/:id/delete").delete(UserControllers.deleteUser);

// TODO => Find only yourself
// router
//   .route("/me")
//   .get(authGuard(USER_ROLE.admin, USER_ROLE.lerner), UserControllers.getMe);

// TODO => change user status
// router
//   .route("/:id/change-status")
//   .post(authGuard(USER_ROLE.admin), UserControllers.changeStatus);

export const UserRoutes = router;
