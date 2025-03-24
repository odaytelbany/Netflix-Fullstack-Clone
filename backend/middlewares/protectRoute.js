import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js"; 
import { User } from "../models/user.js";

export const protectRoute = async (req, res, next) => { 
    try {
        const token = req.cookies["jwt-netflix"];
        if (!token) {
            return res.status(401).json({success: false, message: "UNAUTHORIZED - no token provided !"});
        }
        
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({success: false, message: "UNAUTHORIZED - Invalid Token !"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({success: false, message: "User not found !"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected route", error)
        return res.status(500).json({success: false, message: "Internal server error !"});

    }
}