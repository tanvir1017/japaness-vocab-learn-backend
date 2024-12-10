import express from "express";
import { lernerController } from "../controller/lerner.controller";

const router = express.Router();

// router.route("/all").get(lernerController.get);

router.route("/:id").get(lernerController.getSingleLerner);

// router
//   .route("/:id/update")
//   .patch(
//     sanitizeClientDataViaZod(LernerValidationViaZod.updateLernerValidationSchema),
//     lernerController.,
//   );

// router.route("/:id/delete").delete(AdminControllers.deleteAdmin);

export const AdminRoutes = router;
