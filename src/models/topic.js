import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true
    },
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
    video_uri: {
        type: String,
        required: true
    },
    lecturer_id: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "lecturer",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'publish'],
        default: 'draft'
    },
}, { timestamps: true });
const Topic = mongoose.model("topic", TopicSchema);
export default Topic;