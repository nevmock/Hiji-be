import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    days: {
        type: Number,
        default: 30,
    },
    price: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
    }, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const Plan = mongoose.model("plan", PlanSchema);

export default Plan;