import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { LernerController } from "../controller/lerner.controller";
import { LernerValidationViaZod } from "../validation/lerner.validation";

const router = Router();

// * Route that responsible for find individual Lerner by `email`
router.route("/:id").get(LernerController.getSingleLerner);
router.route("/email/:email").get(LernerController.getLernerByEmail);

// * Route that responsible for find all lerner exist on db
router.route("/").get(LernerController.getAllLerner);

// * Route that responsible for update the lerner information
router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(
      LernerValidationViaZod.updateLernerValidationSchema,
    ),
    LernerController.updateLerner,
  );

// * Route that responsible for soft delete the lerner
router.route("/:id/delete").delete(LernerController.deleteLerner);

export const LernersRoutes = router;
