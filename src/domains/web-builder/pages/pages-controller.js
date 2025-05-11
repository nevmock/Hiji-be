import BaseError from "../../../base_classes/base-error.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import PagesService from './pages-service.js';

class PagesController {
    async index(req, res) {
        const { user } = req;

        const { bussiness_id, id } = req.query;

        if (id) {
            const data = await PagesService.getById(user.id, bussiness_id, id);

            return successResponse(res, data);
        }

        const data = await PagesService.get(user.id, bussiness_id);

        return successResponse(res, data.pages, data.total);
    }

    async create(req, res) {
        const { user } = req;
        const { bussiness_id } = req.body;

        const totalPages = await PagesService.getTotalPagesByUserId(user.id);

        let maxPages;

        if (user.level <= 1) {
            maxPages = 3;
        } else if (user.level === 2) {
            maxPages = 10;
        } else {
            maxPages = Infinity;
        }

        if (totalPages >= maxPages) {
            throw BaseError.forbidden(`Maximum pages reached, upgrade your plan to create more pages`);
        }

        const pages = await PagesService.create(user.id, bussiness_id);

        if (!pages) {
            throw Error("Failed to create pages");
        }

        return createdResponse(res, pages);
    }

    async update(req, res) {
        const { user } = req;

        const { bussiness_id, id, slug, html, css, js, grapes_config } = req.body;

        const pages = await PagesService.update(user.id, bussiness_id, id, { slug, html, css, js, grapes_config });

        if (!pages) {
            throw Error("Failed to update pages");
        }

        return successResponse(res, pages);
    }

    async delete(req, res) {
        const { user } = req;

        const { bussiness_id, id } = req.query;

        const pages = await PagesService.delete(user.id, bussiness_id, id);

        if (!pages) {
            throw Error("Failed to delete pages");
        }

        return successResponse(res, { message: "Page deleted successfully" });
    }
}

export default new PagesController();