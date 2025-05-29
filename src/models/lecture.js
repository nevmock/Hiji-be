import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    current_job_position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },       

}, { timestamps: true });

const Lecture = mongoose.model("lecture", LectureSchema);
export default Lecture;