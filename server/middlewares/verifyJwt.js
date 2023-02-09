import jwt from "jwt-simple";
import config from "config";
import moment from "moment";

export const verifyJwt = (req, res, next) => {
    const token = req.query.toke || req.headers["x-token"];

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }
    try {
        const decoded = jwt.decode(token, config.get("jwtTokenSecret"));
        const isExpired = moment(decoded.exp).isBefore(new Date());

        if (isExpired) {
            return res.status(401).json({ message: "Token Expired" });
        }
        req.user = decoded._id;
        next();
    } catch (error) {
        next(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
