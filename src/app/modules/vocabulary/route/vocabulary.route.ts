import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { VocabularyController } from "../controller/vocabulary.controller";
import { VocabularyValidationViaZod } from "../validation/vocabulary.validation";

const router = Router();

// * Route that responsible for find all Vocabulary exist on db
router.route("/").get(VocabularyController.getAllVocabulary);

// * Route that responsible for find individual Vocabulary by `by _id`
router.route("/:id").get(VocabularyController.getSingleVocabulary);

// * Route that responsible for find individual Vocabulary by `by _id`
router
  .route("/:lessonID/vocab-list")
  .get(VocabularyController.getVocabularyListByLessonID);

// * Route that responsible for find all Vocabularies under a lesson by `by _id`
router
  .route("/:lessonId/lesson-based")
  .get(VocabularyController.getAllVocabularyByLessonId);

// * Route that responsible for update the Vocabulary information
router.route("/create-Vocabulary").post(
  // authGuard(USER_ROLE.admin),
  sanitizeClientDataViaZod(
    VocabularyValidationViaZod.createVocabularyValidationSchema,
  ),
  VocabularyController.createVocabulary,
);

// * Route that responsible for update the Vocabulary information
router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(
      VocabularyValidationViaZod.updateVocabularyValidationSchema,
    ),
    VocabularyController.updateVocabulary,
  );

// * Route that responsible for soft delete the Vocabulary
router.route("/:id/delete").delete(VocabularyController.deleteVocabulary);

export const VocabulariesRoutes = router;
