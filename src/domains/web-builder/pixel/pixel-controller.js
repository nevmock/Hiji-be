class PixelController {
    async index(req, res) {
        const { user_id } = req.app.locals.user;

        if (!user_id) {
            throw Error("User not found");
        }

        const { bussiness_id, id } = req.query;

        if (id) {
            const data = await PixelService.getById(user_id, bussiness_id, id);

            return successResponse(res, data);
        }

        const data = await PixelService.get(user_id, bussiness_id);

        return successResponse(res, data.pixels, data.total);
    }

    async show() {
        throw new Error("Method not implemented");
    }

    async create() {
        throw new Error("Method not implemented");
    }

    async update() {
        throw new Error("Method not implemented");
    }

    async delete() {
        throw new Error("Method not implemented");
    }
}

export default new PixelController();