import BaseError from "../../base_classes/base-error.js";

import TopicService from "./topic-service.js";
import { successResponse, createdResponse} from "../../utils/response.js";
import lessonService from "../lesson/lesson-service.js";

// function isValidObjectId(id) {
//   return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
// }



class TopicController {
    async index(req, res) {
        const topics = await TopicService.get();
        
        return successResponse(res, topics);
    }

    async show(req, res){
        const { id } = req.params;
        // if (!isValidObjectId(id)) {
        //     throw BaseError.badRequest("Invalid topic id");
        // }
        const topic = await TopicService.getById(id);

        if (!topic) {
            throw BaseError.notFound("Topic not found");
        }

        return successResponse(res, topic);
    }

    async showByTopicId(req, res){
        const { topicId} = req.params;
        const lesson = await lessonService.getByTopicId(topicId);
        if (!lesson) {
            throw BaseError.notFound("Lessons not found for this topic");
        }
        return successResponse(res, lesson);
    }

    async create(req, res) {
        const { course_id, slug, title, description, thumbnail_uri, video_uri,lecture_id ,price} = req.body;
        const topic = await TopicService.create({course_id, slug, title, description, thumbnail_uri, video_uri, lecture_id ,price});

        return createdResponse(res, topic);
    }

    async update(req, res) {
        const { id } = req.params;
        
        const { course_id, slug, title, description, thumbnail_uri, video_uri, status, price } = req.body;

        const topic = await TopicService.update(id,{course_id, slug, title, description, thumbnail_uri, video_uri, status, price });

        if (!topic) {
            throw Error("Failed to update topic");
        }
        
        return successResponse(res, topic);
    }

    async delete(req, res) {
        const { id } = req.params;

        const topic = await TopicService.delete(id);

        if (!topic) {
            throw Error("Failed to delete topic");
        }
        
        return successResponse(res, topic);
    }
}

export default new TopicController();