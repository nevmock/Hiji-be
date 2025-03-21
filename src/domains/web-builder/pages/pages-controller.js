import BaseError from "../../../base_classes/base-error.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import PagesService from './pages-service.js';

class PagesController {

    async index(req, res) {
        console.log(req.query);
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { bussiness_id, id } = req.query;

        if (id) {
            const data = await PagesService.getById(user_id, bussiness_id, id);

            return successResponse(res, data);
        }

        const data = await PagesService.get(user_id, bussiness_id);

        return successResponse(res, data.pages, data.total);
    }

    async create(req, res) {
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { bussiness_id } = req.body;

        const pages = await PagesService.create(user_id, bussiness_id);

        if (!pages) {
            throw Error("Failed to create pages");
        }

        return createdResponse(res, pages);
    }

    async update(req, res) {
        console.log(res.body);
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { bussiness_id, id, slug, html, css, js, grapes_config } = req.body;

        const pages = await PagesService.update(user_id, bussiness_id, id, { slug, html, css, js, grapes_config });

        if (!pages) {
            throw Error("Failed to update pages");
        }

        return successResponse(res, pages);
    }

    async delete(req, res) {
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { bussiness_id, id } = req.query;

        console.log(id);
        const pages = await PagesService.delete(user_id, bussiness_id, id);

        if (!pages) {
            throw Error("Failed to delete pages");
        }

        return successResponse(res, { message: "Page deleted successfully" });
    }
}

export default new PagesController();