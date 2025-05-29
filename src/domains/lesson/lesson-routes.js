import BaseRoutes from "../../base_classes/base-routes.js";

import validateCredentials from "../../middlewares/validate-credentials-middleware.js";
import tryCatch from "../../utils/tryCatcher.js";
import lessonController from "./lesson-controller.js";

import { lessonCreateSchema, lessonUpdateSchema } from "./lesson-schema.js";
class LessonRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [
            tryCatch(lessonController.index)
        ]);
        this.router.get("/:id", [
            tryCatch(lessonController.show)
        ]);
        this.router.post("/", [
            validateCredentials(lessonCreateSchema),
            tryCatch(lessonController.create)
        ]);
        this.router.put("/:id", [
            validateCredentials(lessonUpdateSchema),
            tryCatch(lessonController.update)
        ]);
        this.router.delete("/:id", [
            tryCatch(lessonController.delete)
        ]);
    }
}

export default new LessonRoutes().router;