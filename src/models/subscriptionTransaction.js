import mongoose from "mongoose";

const SubscriptionTransactionSchema = new mongoose.Schema({
    user_id: {
        type: String, // gunakan String jika User ID kamu berbentuk UUID (seperti di Prisma)
        required: true,
        ref: 'User',
    },

    level: {
        type: Number,
        required: true,
    },
    days: {
        type: Number,
        required: true,
    },

    order_id: {
        type: String,
        required: false,
    },
    transaction_token: {
        type: String,
        required: false,
    },
    redirect_url: {
        type: String,
        required: false,
    },

    gross_amount: {
        type: Number,
        required: false,
    },
    admin_fee: {
        type: Number,
        required: false,
    },
    payment_method: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const SubscriptionTransaction = mongoose.model("subscription_transaction", SubscriptionTransactionSchema);

export default SubscriptionTransaction;