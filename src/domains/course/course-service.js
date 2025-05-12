import axios from 'axios';
import BaseError from '../../base_classes/base-error.js';

import Course from '../../models/course.js';

class CourseService {
    async get(){
        const cuourses = await Course.find({});

        return cuourses;
    }

    async getById(id){
        const course = await Course.findById(id);

        if (!course) {
            throw BaseError.notFound("Course not found");
        }

        return course;
    }

    async create({slug, title,  description, thumbnail_uri, status }) {
        const course = new Course({ slug, title,description, thumbnail_uri,status});

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
        let course = await this.getById(id);
        if (!course) {
            throw new Error("Course not found");
        } 

        course = await Course.deleteOne({
            _id: course._id
        })

        if (!course) {
            throw new Error("Failed to delete course");
        }


        return {
            message: "Course deleted successfully"
        }
    }
}

export default new CourseService();
