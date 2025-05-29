import BaseError from "../../base_classes/base-error.js";

import LectureService from "./lecture-service.js";
import { successResponse, createdResponse } from "../../utils/response.js";

class LectureController {
    async index(req, res) {
        const lectures = await LectureService.get();
        return successResponse(res, lectures);
    }

    async show(req, res) {
        const { id } = req.params;
        const lecture = await LectureService.getById(id);

        if (!lecture) {
            throw BaseError.notFound("Lecture not found");
        }

        return successResponse(res, lecture);
    }

    async create(req, res) {
        const { name, current_job_position, company } = req.body;
        const lecture = await LectureService.create({ name, current_job_position, company });

        return createdResponse(res, lecture);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, current_job_position, company } = req.body;

        const lecture = await LectureService.update(id, { name, current_job_position, company });

        if (!lecture) {
            throw Error("Failed to update lecture");
        }

        return successResponse(res, lecture);
    }

    async delete(req, res) {
        const { id } = req.params;

        const lecture = await LectureService.delete(id);

        if (!lecture) {
            throw Error("Failed to delete lecture");
        }

        return successResponse(res, lecture);
    }
}
export default new LectureController();