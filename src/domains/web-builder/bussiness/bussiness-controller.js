import mongoose from "mongoose";
import BaseError from "../../../base_classes/base-error.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import BussinessService from "./bussiness-service.js";
import Bussiness from "../../../models/bussiness.js";

class BussinessController {
    async index(req, res) {
        const { user } = req;

        const { bussiness, total } = await BussinessService.get(user.id);

        return successResponse(res, bussiness, total);
    }

    async show(req, res) {
        const { user } = req;

        const { id } = req.params;

        if (!id) {
            throw BaseError.badRequest("Id is required");
        }

        if (!mongoose.Types.ObjectId.isValid(id)){
            throw BaseError.badRequest("Invalid user id");
        }

        const bussiness = await BussinessService.getById(id, user.id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        return successResponse(res, bussiness, 1);
    }

    async create(req, res) {
        const { user } = req;

        const countBussiness = await Bussiness.countDocuments({ user_id: user.id })

        let maxBussiness = 1;
        
        if (user.level === 2) {
            maxBussiness = 3;
        } else if (user.level === 3) {
            maxBussiness = 20;
        }

        if (countBussiness >= maxBussiness) {
            throw BaseError.forbidden(`Maximum Bussiness reached, upgrade your plan to create more Bussiness`);
        }

        const { bussiness_name, phone_number, email, location_id, address } = req.body;
        
        const bussiness = await BussinessService.create({user_id: user.id, bussiness_name, phone_number, email, location_id, address });

        if (!bussiness) {
            throw Error("Failed to create bussiness");
        }

        return createdResponse(res, bussiness);
    }

    async update(req, res) {
        const { user } = req;

        const { id } = req.params;

        if (!id) {
            throw BaseError.badRequest("Id is required");
        }

        const data = req.body;

        const bussiness = await BussinessService.update(user.id, id, data);

        if (!bussiness) {
            throw Error("Failed to update bussiness");
        }

        return successResponse(res, bussiness, 1);
    }

    async delete(req, res) {
        const { user } = req;

        const { id } = req.params;

        if (!id) {
            throw BaseError.badRequest("Id is required");
        }

        const bussiness = await BussinessService.delete(user.id, id);

        if (!bussiness) {
            throw Error("Failed to delete bussiness");
        }

        return successResponse(res, bussiness, 1);
    }
}

export default new BussinessController();