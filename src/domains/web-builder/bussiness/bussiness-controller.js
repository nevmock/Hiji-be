import mongoose from "mongoose";
import BaseError from "../../../base_classes/base-error.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import BussinessService from "./bussiness-service.js";

class BussinessController {
    async index(req, res) {
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { bussiness, total } = await BussinessService.get(user_id);

        return successResponse(res, bussiness, total);
    }

    async show(req, res) {
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { id } = req.params;

        if (!id) {
            throw BaseError.badRequest("Id is required");
        }

        if (!mongoose.Types.ObjectId.isValid(id)){
            throw BaseError.badRequest("Invalid user id");
        }

        const bussiness = await BussinessService.getById(id, user_id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        return successResponse(res, bussiness, 1);
    }

    async create(req, res) {
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { bussiness_name, phone_number, email, location_id, address } = req.body;
        
        const bussiness = await BussinessService.create({user_id, bussiness_name, phone_number, email, location_id, address });

        if (!bussiness) {
            throw Error("Failed to create bussiness");
        }

        return createdResponse(res, bussiness);
    }

    async update(req, res) {
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { id } = req.params;

        if (!id) {
            throw BaseError.badRequest("Id is required");
        }

        const data = req.body;

        const bussiness = await BussinessService.update(user_id, id, data);

        if (!bussiness) {
            throw Error("Failed to update bussiness");
        }

        return successResponse(res, bussiness, 1);
    }

    async delete(req, res) {
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { id } = req.params;

        if (!id) {
            throw BaseError.badRequest("Id is required");
        }

        const bussiness = await BussinessService.delete(user_id, id);

        if (!bussiness) {
            throw Error("Failed to delete bussiness");
        }

        return successResponse(res, bussiness, 1);
    }
}

export default new BussinessController();