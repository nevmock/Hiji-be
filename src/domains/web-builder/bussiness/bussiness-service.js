import axios from "axios";
import BaseError from "../../../base_classes/base-error.js";
import Bussiness from "../../../models/bussiness.js";
import Page from "../../../models/page.js";
import deletePageDirectory from "../../../utils/deletePageDirectory.js";

class BussinessService {
    async get(user_id){
        const [bussiness, total] = await Promise.all([
            Bussiness.find({ user_id }),
            Bussiness.countDocuments({ user_id })
        ]);

        return { bussiness, total };
    }

    async getById(id, user_id){
        const bussiness = await Bussiness.findById(id);
        // console.log(id);
        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        if (bussiness.user_id != user_id) {
            throw BaseError.forbidden("Forbidden");
        }

        return bussiness;
    }

    async create({ user_id, bussiness_name, phone_number, email, location_id, address }) {
        const bussiness = new Bussiness({ user_id, bussiness_name, phone_number, email, location_id, address });

        const createdBussiness = await bussiness.save();

        if (!createdBussiness) {
            throw new Error("Failed to create bussiness");
        }

        return createdBussiness;
    }

    async update(user_id, id, data){
        let bussiness = await this.getById(id, user_id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        bussiness = await Bussiness.updateOne({
            _id: id
        }, data);

        return bussiness;
    }

    async delete(user_id, id){
        let bussiness = await this.getById(id, user_id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        Promise.all([
            axios.delete(`${process.env.BASE_URL}/api/domain`, {
                user_id: user_id,
                business_id: id,
                domain: bussiness.sub_domain_default
            }),
            Bussiness.deleteOne({
                _id: id
            }),
            Page.deleteMany({
                bussiness_id: id
            }),
            deletePageDirectory(`${process.env.BASE_PATH_PREFIX}/${user_id}/${id}`)
        ]);

        return true;
    }
}

export default new BussinessService();