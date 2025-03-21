import jwt from "jsonwebtoken";

const generateToken = (id, time = "1h") => {
    return jwt.sign({ user_id: id }, process.env.JWT_SECRET, {
        expiresIn: time,
    });
};

export default generateToken;
