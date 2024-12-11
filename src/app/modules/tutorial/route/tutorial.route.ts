import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { TutorialController } from "../controller/tutorial.controller";
import { TutorialValidationViaZod } from "../validation/tutorial.validation";
const router = Router();

// * Route that responsible for find all Tutorial exist on db
router.route("/").get(TutorialController.getAllTutorial);

// * Route that responsible for find individual Tutorial by `by _id`
router.route("/:id").get(TutorialController.getSingleTutorial);

// * Route that responsible for update the Tutorial information
router.route("/create-tutorial").post(
  //authGuard(USER_ROLE.admin),
  sanitizeClientDataViaZod(
    TutorialValidationViaZod.createTutorialValidationSchema,
  ),
  TutorialController.createTutorial,
);

// * Route that responsible for update the Tutorial information
router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(
      TutorialValidationViaZod.updateTutorialValidationSchema,
    ),
    TutorialController.updateTutorial,
  );

// * Route that responsible for soft delete the Tutorial
router.route("/:id/delete").delete(TutorialController.deleteTutorial);

export const TutorialsRoutes = router;
