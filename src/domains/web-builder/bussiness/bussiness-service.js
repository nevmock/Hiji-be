import axios from "axios";
import BaseError from "../../../base_classes/base-error.js";
import Bussiness from "../../../models/bussiness.js";
import Page from "../../../models/page.js";
import deletePageDirectory from "../../../utils/deletePageDirectory.js";
import subDomainGenerator from "../../../utils/subDomainGenerator.js";

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

        const sub_domain_default = await subDomainGenerator(bussiness_name);

        const dnsData = await this.createDns(user_id, createdBussiness._id ,sub_domain_default);
        if (!dnsData) {
            throw new Error("Failed to create dns");
        }

        const updatedBussiness = await Bussiness.findOneAndUpdate(
            { _id: createdBussiness._id },
            {
                sub_domain_default,
                dns_id: dnsData.dnsRecordId,
                domain: process.env.DOMAIN
            },
            { new: true } 
        );
        
        if (!updatedBussiness) {
            throw new Error("Failed to update subdomain bussiness");
        }
        
        return updatedBussiness;
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
            Bussiness.deleteOne({
                _id: id
            }),
            Page.deleteMany({
                bussiness_id: id
            }),
            deletePageDirectory(`${process.env.BASE_PATH_PREFIX}/${user_id}/${id}`),
            this.deleteDns(bussiness.dns_id)
        ]);

        return {
            message: "Bussiness deleted successfully",
        };
    }

    async createDns(user_id, bussiness_id, sub_domain_default) {
        try {
            const response = await axios.post(`${process.env.DOMAIN_SERVICE_URL}/v1/subdomain`, {
                user_id: user_id,
                bussiness_id: bussiness_id,
                name: `${sub_domain_default}`,
            })

            // console.log(response.data.data);

            return response.data.data.data;
        } catch (error) {
            console.log("Error create dns:");
            console.log(error);
        }
    }

    async deleteDns(dns_id) {
        try {
            const response = await axios.delete(`${process.env.DOMAIN_SERVICE_URL}/v1/subdomain`, {
                data: {
                    dns_id: dns_id,
                },
            })

            console.log(response.data.data);

            return response.data.data.data;
        } catch (error) {
            console.log("Error delete dns:");
            console.log(error);
        }
    }
}

export default new BussinessService();