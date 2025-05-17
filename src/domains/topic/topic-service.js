import mongoose from "mongoose";
import BaseError from "../../base_classes/base-error.js";
import Topic from "../../models/topic.js";
import courseService from "../course/course-service.js";
import lectureService from "../lecture/lecture-service.js";

// const lecturer_id_test = new mongoose.Types.ObjectId();
class TopicService {
    async get() {
        const topics = await Topic.find({});
        return topics;
    }
    async getById(id){
        const topic = await Topic.findById(id);
        if (!topic) {
            throw BaseError.notFound("Topic not found");
        }
        return topic;
    }

    async create({ course_id, slug, title, description, thumbnail_uri, video_uri, lecture_id ,price }) {
        const courseId = await courseService.getById(course_id);
        if (!courseId) {
            throw BaseError.notFound("Course not found");
        }
        const lecturer_id = await lectureService.getById(lecture_id);
        if (!lecturer_id) {
            throw BaseError.notFound("Lecture not found");
        }
        // const lecturer_id = lecturer_id_test;
        const topic = new Topic({ course_id, slug, title, description, thumbnail_uri, video_uri, lecturer_id ,price });
        const createdTopic = await topic.save();
        if (!createdTopic) {
            throw new Error("Failed to create topic");
        }
        return createdTopic;
    }

    async update(id, data) {
        const TopicId = await this.getById(id);
        const courseId = await courseService.getById(TopicId.course_id);
        if (!courseId || !TopicId) {
            throw BaseError.notFound("Topic or course id not found");
        }
        const topic = await Topic.updateOne(
            { _id: id },
            data
        );
        if (!topic) {
            throw new Error("Failed to update topic");
        }
        return topic;
    }

    async delete(id) {
        let topic = await this.getById(id);
        if (!topic) {
            throw new Error("Topic not found");
        }
        topic = await Topic.deleteOne({
            _id: topic._id
        });
        if (!topic) {
            throw new Error("Failed to delete topic");
        }
        return {
            message: "Topic deleted successfully"
        }
    }

    async getByCourseId(course_id) {
        const topic = await Topic.find({ course_id });
        if (!topic) {
            throw BaseError.notFound("Topic not found");
        }
        return topic;
    }

    async deleteByCourseId(course_id) {
        const topic = await Topic.deleteMany(
            {course_id}
        );
        if (topic.deletedCount === 0) {
            return { message: "No topics found for the given course_id" }; // Mengembalikan pesan jika tidak ada data yang dihapus
        }
        return {
            message: "Topic deleted successfully"
        }
    }
}

export default new TopicService();

