import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";



export const protectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        try {
            const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
            const user = await User.findById(decodedToken.userId).select("-password");
            if(!user){
                return res.status(404).json({ error: "User not found" });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }        
    } catch (error) {
        return res.status(500).json({ error: "Failed to protect route" });
    }
};

export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ error: "Access denied - Admin only" });
    }
};