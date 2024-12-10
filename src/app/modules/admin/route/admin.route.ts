import express from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { AdminControllers } from "../controller/admin.controller";
import { AdminValidationViaZod } from "../validation/admin.validation";

const router = express.Router();

router.route("/all").get(AdminControllers.getAllAdmins);

router.route("/:id").get(AdminControllers.getSingleAdmin);

router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(AdminValidationViaZod.updateAdminValidationSchema),
    AdminControllers.updateAdmin,
  );

router.route("/:id/delete").delete(AdminControllers.deleteAdmin);

export const AdminRoutes = router;
