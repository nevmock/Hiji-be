import BaseRoutes from "../../base_classes/base-routes.js";
import PixelController from "./pixel-controller.js";

import tryCatch from "../../utils/tryCatcher.js";
import validateCredentials from '../../middlewares/validate-credentials-middleware.js';

class PixelRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [tryCatch(PixelController.index)]);
        this.router.get("/:id", [tryCatch(PixelController.show)]);
        this.router.post("/", [tryCatch(PixelController.create)]);
        this.router.put("/:id", [tryCatch(PixelController.update)]);
        this.router.delete("/:id", [tryCatch(PixelController.delete)]);
    }
}

export default new PixelRoutes().router;