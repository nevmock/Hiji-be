import BaseRoutes from "../../base_classes/base-routes.js";
import authToken from "../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";

import tryCatch from "../../utils/tryCatcher.js";
import courseController from "./course-controller.js";
import {createCourseSchema, updateCourseSchema} from "./course-schema.js";

class CourseRoutes extends BaseRoutes{
    routes(){
        this.router.get("/", [
            tryCatch(courseController.index)
        ]);
        this.router.get("/:id", [
            tryCatch(courseController.show)
        ]);
        this.router.post("/", [
            // authToken,
            validateCredentials(createCourseSchema),
            tryCatch(courseController.create)
        ]);
        this.router.put("/:id", [
            // authToken,
            validateCredentials(updateCourseSchema),
            tryCatch(courseController.update)
        ]);
        this.router.delete("/:id", [
            // authToken,
            tryCatch(courseController.delete)
        ]);
    }
}

export default new CourseRoutes().router;