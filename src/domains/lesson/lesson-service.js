import BaseError from "../../base_classes/base-error.js";

import Lesson from "../../models/lesson.js";

import topicService from "../topic/topic-service.js";


class LessonService {
    async get() {
        let lessons = await Lesson.find({});
        
        return lessons;
    }

    async getById(id) {
        const lesson = await Lesson.findById(id);

        if (!lesson) {
            throw BaseError.notFound("Lesson not found");
        }

        return lesson;
    }

    async getByTopicId(topic_id) {
        const lessons = await Lesson.find({
            topic_id: topic_id
        })
        if (!lessons) {
            throw BaseError.notFound("Lessons not found for this topic");
        }
        return lessons;
    }

    async create({ topic_id, title, video_uri}) {
        const lesson = new Lesson({ topic_id, title, video_uri});
        const topicId = await topicService.getById(topic_id);
        
        if (!topicId) {
            throw BaseError.notFound("Topic not found");
        }

        const createdLesson = await lesson.save();

        if (!createdLesson) {
            throw new Error("Failed to create lesson");
        }

        return createdLesson;
    }

    async update(id, data) {
        const lessonId = await Lesson.findById(id);

        if (!lessonId) {
            throw BaseError.notFound("Lesson not found");
        }

        const lesson = await Lesson.updateOne({
            _id: id
        }, data);

        if (!lesson) {
            throw new Error("Failed to update lesson");
        }

        return lesson;
    }

    async delete(id) {
        const lesson = await Lesson.findById(id);
        
        if (!lesson) {
            throw new Error("Lesson not found");
        }

        const lessonDelete = await Lesson.deleteOne({
            _id: lesson._id
        });

        if (!lessonDelete) {
            throw new Error("Failed to delete lesson");
        }

        return {
            message: "Lesson deleted successfully"
        }
    }
}

export default new LessonService();
