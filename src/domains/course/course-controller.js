import mongoose from "mongoose";
import BaseError from "../../base_classes/base-error.js";

import CourseService from "./course-service.js";
import { successResponse, createdResponse} from "../../utils/response.js";
class CourseController {
    async index(req, res) {
        const courses = await CourseService.get();

        return successResponse(res, courses);
    }

    async show(req, res){
        const { id } = req.params;

        const course = await CourseService.getById(id);

        if (!course) {
            throw BaseError.notFound("Course not found");
        }

        return successResponse(res, course);
    }

    async create(req, res) {
        const { slug, title, description, thumbnail_uri} = req.body;
        const course = await CourseService.create({slug, title, description, thumbnail_uri});

        return createdResponse(res, course);
    }

    async update(req, res) {
        const { id } = req.params;
        

        const { slug, title, description, thumbnail_uri, status } = req.body;

        const course = await CourseService.update(id,{slug, title, description, thumbnail_uri, status });

        if (!course) {
            throw Error("Failed to update course");
        }
        
        return successResponse(res, course);
    }

    async delete(req, res) {
        const { id } = req.params;

        const course = await CourseService.delete(id);

        if (!course) {
            throw Error("Failed to delete course");
        }
        
        return successResponse(res, course);
    }
}

export default new CourseController();