import BaseError from '../../base_classes/base-error.js';

import Course from '../../models/course.js';
import Topic from '../../models/topic.js';
import topicService from '../topic/topic-service.js';

class CourseService {
    async get(){
        let courses = await Course.find({});
        const topic = await topicService.get();
        // for (let index = 0; index < courses.length; index++) {
        //     const course = courses[index];
        //     const topicTotal = topic.filter((topic) => topic.course_id.toString() === course._id.toString());
        //     courses[index] = {
        //         course: course,
        //         topic_course: topicTotal,
        //     }
        // }
        courses = courses.map(course => ({
            course,
            topic_course: topic.filter(topic => topic.course_id.toString() === course._id.toString())
        }));
        return courses;
    }

    async getById(id){
        const course = await Course.findById(id);

        if (!course) {
            throw BaseError.notFound("Course not found");
        }

        return course;
    }

    async create({slug, title,  description, thumbnail_uri}) {
        const course = new Course({ slug, title,description, thumbnail_uri});
        const createdCourse = await course.save();

        if (!createdCourse) {
            throw new Error("Failed to create course");
        }

        return createdCourse;
    }

    async update(id, data){
        const courseId = await Course.findById(id);

        if (!courseId) {
            throw BaseError.notFound("Course not found");
        }

        const course = await Course.updateOne({
            _id: id
        }, data);

        if (!course) {
            throw new Error("Failed to update course");
        }
        return course;
    }

    async delete(id){
        const course = await Course.findById(id);
        if (!course) {
            throw BaseError.notFound("Course not found");
        }
        const courseDelete = await Course.deleteOne({
            _id: id
        });
        if (!courseDelete) {
            throw new Error("Failed to delete course");
        }
        await topicService.deleteByCourseId(id);
        return {
            message: "Course deleted successfully"
        }
    }
}

export default new CourseService();
