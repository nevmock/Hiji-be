import mongoose from "mongoose";

const PixelSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    pixel_name: {
        type: String,
        required: true
    },
    pixel_id: {
        type: String,
        required: true
    },
}, { timestamps: true }); 

const Pixel = mongoose.model("pixel", PixelSchema);

export default Pixel;