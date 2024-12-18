import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { LessonController } from "../controller/lesson.controller";
import { LessonValidationViaZod } from "../validation/lesson.validation";
const router = Router();

// * Route that responsible for find all Lesson exist on db
router.route("/").get(LessonController.getAllLesson);

// * Route that responsible for find all Lesson exist on db
router.route("/list").get(LessonController.getAllLessonList);

// * Route that responsible for find individual Lesson by `by _id`
router.route("/:id").get(LessonController.getSingleLesson);

// * Route that responsible for find individual Lesson by `by Lesson No`
router.route("/lessonNo/:lessonNo").get(LessonController.getLessonByLessonNo);

// * Route that responsible for update the Lesson information
router
  .route("/create-lesson")
  .post(
    sanitizeClientDataViaZod(
      LessonValidationViaZod.createLessonValidationSchema,
    ),
    LessonController.createLesson,
  );

// * Route that responsible for update the Lesson information
router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(
      LessonValidationViaZod.updateLessonValidationSchema,
    ),
    LessonController.updateLesson,
  );

// * Route that responsible for soft delete the Lesson
router.route("/:id/delete").delete(LessonController.deleteLesson);

export const LessonsRoutes = router;
