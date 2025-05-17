import BaseError from "../../base_classes/base-error.js";


import Lecture from "../../models/lecture.js";

class LectureService {
    async get() {
        const lectures = await Lecture.find({});
        return lectures;
    }

    async getById(id) {
        const lecture = await Lecture.findById(id);
        if (!lecture) {
            throw BaseError.notFound("Lecture not found");
        }
        return lecture;
    }

    async create({ name, current_job_position, company }) {
        const lecture = new Lecture({ name, current_job_position, company });
        const createdLecture = await lecture.save();
        if (!createdLecture) {
            throw new Error("Failed to create lecture");
        }
        return createdLecture;
    }

    async update(id, data) {
        const lectureId = await this.getById(id);
        if (!lectureId) {
            throw BaseError.notFound("Lecture not found");
        }
        const lecture = await Lecture.updateOne(
            { _id: id },
            data
        );
        if (!lecture) {
            throw new Error("Failed to update lecture");
        }
        return lecture;
    }

    async delete(id) {
        let lecture = await this.getById(id);
        if (!lecture) {
            throw new Error("Lecture not found");
        }
        lecture = await Lecture.deleteOne({
            _id: lecture._id
        });
        if (!lecture) {
            throw new Error("Failed to delete lecture");
        }
        return {
            message: "Lecture deleted successfully",
        }
    }
}

export default new LectureService();
