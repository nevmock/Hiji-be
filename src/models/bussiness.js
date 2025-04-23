import mongoose from "mongoose";

const BussinessSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    bussiness_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location_id: {
        type: String,
        // ref: 'location',
        required: true
    },
    profile_uri: {
        type: String,
        default: null
    },
    is_ppn_active: {
        type: Boolean,
        required: false,
        default: false
    },
    percentage_ppn: {
        type: Number,
        required: false,
        default: 0
    },
    is_active: {
        type: Boolean,
        required: false,
        default: false
    },
    is_banned: {
        type: Boolean,
        required: false,
        default: false
    },
    sub_domain_default: {
        type: String,
        required: false,
        default: null
    },
    dns_id: {
        type: String,
        required: false,
        default: null
    },
    domain: {
        type: String,
        required: false,
        default: null
    },
    verifiedAt: {
        type: Date,
        required: false,
        default: null
    }
}, { timestamps: true }); 

const Bussiness = mongoose.model("bussiness", BussinessSchema);

export default Bussiness;