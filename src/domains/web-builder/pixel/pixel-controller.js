import pixelService from "./pixel-service.js";
import { createdResponse, successResponse } from "../../../utils/response.js"
import BaseError from "../../../base_classes/base-error.js";

class PixelController {
    async index(req, res) {
        const { user } = req

        const pixels = await pixelService.getAll(user);

        return successResponse(res, pixels.data, pixels.total);
    }

    async show(req, res) {
        const { id } = req.params;

        const { user } = req

        const pixel = await pixelService.getById(id, user);

        return successResponse(res, pixel);
    }

    async create(req, res) {
        const { pixel_name, pixel_id } = req.body;

        const { user } = req

        const pixel = await pixelService.create({
            user,
            pixel_name,
            pixel_id
        });

        return createdResponse(res, pixel);
    }

    async update(req, res) {
        const { id } = req.params;

        const { user } = req

        if (!id){
            throw BaseError.badRequest("Id is required")
        }

        const data = req.body;

        const updatedPixel = await pixelService.update(id, user, data);

        return successResponse(res, updatedPixel);
    }

    async delete(req, res) {
        const { id } = req.params;

        const { user } = req

        if (!id){
            throw BaseError.badRequest("Id is required")
        }

        await pixelService.deleteById(id, user);

        return successResponse(res, { message: "Pixel deleted successfully" })
    }
}

export default new PixelController();