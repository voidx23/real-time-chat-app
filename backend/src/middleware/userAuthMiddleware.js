import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const userAuthenticator = async (req, res, next) => {

    try {

        const token = req.cookies.jwtToken;

        if (!token) return res.status(401).json({ message: "Unauthorized request: Token not found" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) return res.status(401).json({ message: "Unauthorized request: Token invalid" });

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;

        next();

    } catch (error) {
        console.log("Error detected, location:User Auth Middleware", error.message);
        res.status(500).json({ message: "Server error" });
    }

}