import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
    bussiness_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bussiness',
        required: false
    },
    slug: {
        type: String,
        required: true
    },
    grapes_config: {
        type: Object,
        required: false
    },
    assets_uri: {
        type: String,
        default: null
    }
});

const Page = mongoose.model("page", PageSchema);

export default Page;