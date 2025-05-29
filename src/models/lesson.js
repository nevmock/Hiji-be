import mongoose from "mongoose";


const LessonSchema = new mongoose.Schema({
    topic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topic",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    video_uri: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'publish'],
        default: 'draft',
        required: true
    },
}, { timestamps: true });


const Lesson = mongoose.model("lesson", LessonSchema);

export default Lesson;