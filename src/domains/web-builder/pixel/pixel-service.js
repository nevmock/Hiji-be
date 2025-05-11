import BaseError from "../../../base_classes/base-error.js";
import Pixel from "../../../models/pixel.js";

class PixelService {
    async getAll(user){
        const [ data, total ] = await Promise.all([
            Pixel.find({ user_id: user.id }),
            Pixel.countDocuments({ user_id: user.id })
        ])

        return { data, total };
    }

    async getById(id, user){
        const pixel = await Pixel.findOne({
            _id: id,
            user_id: user.id
        });

        if (!pixel){
            throw BaseError.notFound("Pixel Not Found")
        }

        return pixel;
    }

    async create({ user, pixel_name, pixel_id }) {
        // console.log(user);
        const pixel = new Pixel({
            user_id: user.id,
            pixel_name,
            pixel_id,
        });

        const createdPixel = await pixel.save();

        if (!createdPixel){
            throw new Error("Failed to create pixel");
        }    

        return createdPixel;
    }

    async update(id, user, data){
        const pixelExists = await Pixel.findById(id);

        if (!pixelExists) {
            throw new BaseError.notFound("Pixel not found");
        }

        const updatedPixel = await Pixel.findOneAndUpdate({ 
            _id: id,
            user_id: user.id
        },
            data,
        { new: true }
        );

        if (!updatedPixel){
            throw new Error("Failed to update pixel");
        }

        return updatedPixel;
    }

    async deleteById(id, user){
        return await Pixel.deleteOne({
            _id: id,
            user_id: user.id
        });
    }
}

export default new PixelService();