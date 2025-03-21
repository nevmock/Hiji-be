import BaseRoutes from "../../../base_classes/base-routes.js";
import PagesController from "./pages-controller.js";

import tryCatch from "../../../utils/tryCatcher.js";
import validateCredentials from '../../../middlewares/validate-credentials-middleware.js';
import { pagesSchema, paramsSchema, updatePagesSchema } from "./pages-schema.js";
import authToken from "../../../middlewares/auth-token-middleware.js";

class PagesRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [
            authToken,
            // validateCredentials(paramsSchema),
            tryCatch(PagesController.index)
        ]);
        this.router.post("/", [
            authToken,
            validateCredentials(pagesSchema),
            tryCatch(PagesController.create)
        ]);
        this.router.put("/", [
            authToken,
            validateCredentials(updatePagesSchema),
            tryCatch(PagesController.update)
        ]);
        this.router.delete("/", [
            authToken,
            tryCatch(PagesController.delete)
        ]);
        this.router.post("/save", [
            authToken,
            tryCatch(PagesController.save)
        ])
    }
}

export default new PagesRoutes().router;