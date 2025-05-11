import mongoose from 'mongoose';
import BaseError from '../../../base_classes/base-error.js';
import { midtransSnap } from '../../../config/midtrans.js';
import Plan from '../../../models/plan.js';
import SubscriptionTransaction from '../../../models/subscriptionTransaction.js';
import User from '../../../models/user.js';

class SubscriptionService {
    async createSnap(plan_id, user) {
        const session = await mongoose.startSession();
        session.startTransaction();

        const plan = await Plan.findById(plan_id).session(session);
        if (!plan) {
            throw new BaseError.badRequest("Plan not found");
        }

        const adminFee = Math.ceil(plan.price * 0.007);
        const grossAmount = plan.price + adminFee;

        const [transaction] = await SubscriptionTransaction.create([{
            user_id: user.id,
            level: plan.level,
            days: plan.days,
        }], { session });

        const parameter = {
            transaction_details: {
                order_id: transaction._id.toString(),
                gross_amount: grossAmount,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: user.name,
                email: user.email,
                phone: user.phone_number,
            },
            enabled_payments: ['other_qris'],
            item_details: [
                {
                    id: plan._id.toString(),
                    price: plan.price,
                    quantity: 1,
                    name: `${plan.name} ${plan.days} Days`,
                },
                {
                    id: 'admin_fee',
                    price: adminFee,
                    quantity: 1,
                    name: 'Transaction Fee',
                }
            ],
            metadata: {
                type: 'subscription',
                id: transaction._id.toString(),
            }
        };

        const snap = await midtransSnap.createTransaction(parameter);

        if (!snap) {
            throw new Error("Failed to create snap");
        }

        await SubscriptionTransaction.updateOne(
            { _id: transaction._id },
            {
                $set: {
                    transaction_token: snap.token,
                    redirect_url: snap.redirect_url,
                    gross_amount: grossAmount,
                    admin_fee: adminFee,
                }
            },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return snap;
    }

    async updateSubscriptionTransaction(data){
        const subscription_transaction = await SubscriptionTransaction.findById(data.metadata.id);

        console.log(`Transaction notification received. Order ID: ${data.order_id}. Transaction status: ${data.transaction_status}. Fraud status: ${data.fraud_status}`);

        if (!subscription_transaction) {
            throw new BaseError.badRequest("Subscription transaction not found");
        }

        if (data.transaction_status === 'capture') {
            if (data.fraud_status === 'accept'){
                await SubscriptionTransaction.findByIdAndUpdate(subscription_transaction._id, {
                    status: data.transaction_status
                });
                
                const user = await User.findById(subscription_transaction.user_id);

                const new_expired_date = () => {
                    const now = new Date();
                    const daysToMs = subscription_transaction.days * 24 * 60 * 60 * 1000;

                    if (user.subs_expired_at === null || new Date(user.subs_expired_at) <= now) {
                        return new Date(now.getTime() + daysToMs);
                    } else {
                        return new Date(new Date(user.subs_expired_at).getTime() + daysToMs);
                    }
                };

                await User.findByIdAndUpdate(user._id, {
                    subs_level: subscription_transaction.level,
                    subs_expired_at: new_expired_date(),
                });
            }
        } else if (data.transaction_status === 'settlement') {
            await SubscriptionTransaction.findByIdAndUpdate(subscription_transaction._id, {
                status: data.transaction_status
            });
            
            const user = await User.findById(subscription_transaction.user_id);

            const new_expired_date = () => {
                const now = new Date();
                const daysToMs = subscription_transaction.days * 24 * 60 * 60 * 1000;

                if (user.subs_expired_at === null || new Date(user.subs_expired_at) <= now) {
                    return new Date(now.getTime() + daysToMs);
                } else {
                    return new Date(new Date(user.subs_expired_at).getTime() + daysToMs);
                }
            };

            await User.findByIdAndUpdate(user._id, {
                subs_level: subscription_transaction.level,
                subs_expired_at: new_expired_date(),
            });

        } else if (data.transaction_status === 'cancel' || data.transaction_status === 'deny' || data.transaction_status === 'expire') {
            await SubscriptionTransaction.findByIdAndUpdate(subscription_transaction._id, {
                status: data.transaction_status
            });

        } else if (data.transaction_status === 'pending') {
            await SubscriptionTransaction.findByIdAndUpdate(subscription_transaction._id, {
                status: data.transaction_status,
                order_id: data.transaction_id,
                payment_method: data.payment_type
            });
        }

        return true;
    }
}

export default new SubscriptionService();