import lectureController from "./lecture-controller.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";
import tryCatch from "../../utils/tryCatcher.js";

import BaseRoutes from "../../base_classes/base-routes.js";
import { lectureCreateSchema, lectureUpdateSchema } from "./lecture-schema.js";




class LectureRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [   
    
            tryCatch(lectureController.index)
        ]);
        this.router.get("/:id", [
            tryCatch(lectureController.show)
        ]);
        this.router.post("/", [
            validateCredentials(lectureCreateSchema),
            tryCatch(lectureController.create)
        ]);
        this.router.put("/:id", [
            validateCredentials(lectureUpdateSchema),
            tryCatch(lectureController.update)
        ]);
        this.router.delete("/:id", [
            tryCatch(lectureController.delete)
        ]);
    }
}

export default new LectureRoutes().router;