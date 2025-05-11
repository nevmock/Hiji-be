import db from '../../config/db.js';
import BaseError from '../../base_classes/base-error.js';
import Plan from '../../models/plan.js';

class PlanService {
    async getAll(){
        const [ data, total ] = await Promise.all([
            Plan.find(),
            Plan.countDocuments()
        ])

        return { data, total };
    }

    async getById(id){
        const plan = await Plan.findById(id);

        if (!plan){
            throw BaseError.notFound("Plan Not Found")
        }

        return plan;
    }

    async create({ name, days, price, level }) {
        const plan = new Plan({
            name,
            days,
            price,
            level,
            is_active: false,
        });

        const createdPlan = await plan.save();

        if (!createdPlan){
            throw new Error("Failed to create plan");
        }    

        return createdPlan;
    }

    async update(id, data){
        const planExists = await Plan.findById(id);

        if (!planExists) {
            throw new BaseError.notFound("Plan not found");
        }

        const updatedPlan = await Plan.findOneAndUpdate({ 
            _id: id 
        },
            data,
        { new: true }
        );

        if (!updatedPlan){
            throw new Error("Failed to update plan");
        }

        return updatedPlan;
    }

    async deleteById(id){
        return await Plan.deleteOne({
            _id: id
        });
    }
}

export default new PlanService();