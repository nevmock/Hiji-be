import BaseRoutes from "../../../base_classes/base-routes.js";
import BussinessController from "./bussiness-controller.js";

import tryCatch from "../../../utils/tryCatcher.js";
import validateCredentials from '../../../middlewares/validate-credentials-middleware.js';
import authToken from "../../../middlewares/auth-token-middleware.js";
import { bussinessSchema } from "./bussiness-schema.js";

class BussinessRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [
            authToken,
            tryCatch(BussinessController.index)
        ]);
        this.router.get("/:id", [
            authToken,
            tryCatch(BussinessController.show)
        ]);
        this.router.post("/", [
            authToken,
            validateCredentials(bussinessSchema),
            tryCatch(BussinessController.create)
        ]);
        this.router.put("/:id", [
            authToken,
            tryCatch(BussinessController.update)
        ]);
        this.router.delete("/:id", [
            authToken,
            tryCatch(BussinessController.delete)
        ]);
    }
}

export default new BussinessRoutes().router;