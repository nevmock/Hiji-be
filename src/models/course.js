import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail_uri: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'publish'],
        default: null
    },
}, { timestamps: true });

const Course = mongoose.model("course", CourseSchema);
export default Course;