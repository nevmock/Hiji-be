import { successResponse } from "../../utils/response.js";
import AuthService from "./auth-service.js";

class AuthController {
    async login(req, res) {
        const { username, password } = req.body;

        const token = await AuthService.login(username, password);

        if (!token) {
            throw Error("Failed to login");
        }

        return successResponse(res, { token });
    }

    async register(req, res) {
        const { name, username, email, password, phone_number, address } = req.body;

        const message = await AuthService.register({ name, username, email, password, phone_number, address });

        if (!message) {
            throw Error("Failed to register");
        }

        return successResponse(res, message);
    }

    async verify(req, res) {
        const { token } = req.params;

        const response = await AuthService.verify(token);

        if (response.status !== 200) {
            return res.redirect(`${process.env.FE_URL}/login?verify=failed&message=${response.message}`);
        }

        return res.redirect(`${process.env.FE_URL}/login?verify=success`);

    }

    async getProfile(req, res){
        const user = await AuthService.getProfile(req.app.locals.user.id);

        if (!user) {
            throw Error("Failed to get user profile");
        }
        
        return successResponse(res, user);
    }

    async updateProfile(req, res){
        const { name, email, phone_number } = req.body;

        const user = await AuthService.updateProfile(req.app.locals.user.id, { name, email, phone_number });

        if (!user) {
            throw Error("Failed to update user profile");
        }

        return successResponse(res, user);
    }

    async updatePassword(req, res){
        const { old_password, new_password } = req.body;

        const message = await AuthService.updatePasswordProfile(req.app.locals.user.id, old_password, new_password);

        if (!message) {
            throw Error("Failed to update user password");
        }

        return successResponse(res, message);
    }
}

export default new AuthController();