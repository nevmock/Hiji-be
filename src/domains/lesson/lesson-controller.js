import BaseError from "../../base_classes/base-error.js";

import LessonService from "./lesson-service.js";

import { successResponse, createdResponse } from "../../utils/response.js";
class LessonController {
    async index(req, res) {
        const lessons = await LessonService.get();
        return successResponse(res, lessons);
    }

    async show(req, res) {
        const { id } = req.params;
        const lesson = await LessonService.getById(id);
        if (!lesson) {
            throw BaseError.notFound("Lesson not found");
        }
        return successResponse(res, lesson);
    }

    async create(req, res) {
        const { topic_id, title, video_uri } = req.body;
        const lesson = await LessonService.create({ topic_id, title, video_uri });
        return createdResponse(res, lesson);
    }

    async update(req, res) {
        const { id } = req.params;
        const { topic_id, title, video_uri, status } = req.body;
        const lesson = await LessonService.update(id, { topic_id, title, video_uri, status });
        if (!lesson) {
            throw Error("Failed to update lesson");
        }
        return successResponse(res, lesson);
    }

    async delete(req, res) {
        const { id } = req.params;
        const lesson = await LessonService.delete(id);
        if (!lesson) {
            throw Error("Failed to delete lesson");
        }
        return successResponse(res, lesson);
    }
}

export default new LessonController();