import BaseRoutes from "../../../base_classes/base-routes.js";
import PixelController from "./pixel-controller.js";

import tryCatch from "../../../utils/tryCatcher.js";
import validateCredentials from '../../../middlewares/validate-credentials-middleware.js';
import { createPixelSchema, updatePixelSchema } from "./pixel-schema.js";
import authToken from "../../../middlewares/auth-token-middleware.js";

class PixelRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [
            authToken,
            tryCatch(PixelController.index)
        ]);

        this.router.get("/:id", [
            authToken,
            tryCatch(PixelController.show)
        ]);

        this.router.post("/", [
            authToken,
            validateCredentials(createPixelSchema),
            tryCatch(PixelController.create)
        ]);

        this.router.put("/:id", [
            authToken,
            validateCredentials(updatePixelSchema),
            tryCatch(PixelController.update)
        ]);

        this.router.delete("/:id", [
            authToken,
            tryCatch(PixelController.delete)
        ]);
    }
}

export default new PixelRoutes().router;