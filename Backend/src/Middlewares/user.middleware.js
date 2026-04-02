import blackListModel from "../Models/blackListModel.js";
import userModel from "../Models/user.model.js";
import jwt from 'jsonwebtoken'
export const IdentifyUser = async (req, res, next) => {
    let decoded;
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access",
            error: "Token not found",
            success: false
        })
    }
    const isblackListed = await blackListModel.findOne({ token })
    if (isblackListed) {
        return res.status(401).json({
            message: "User not authorized",
            success: false,
            error: "Trying to access a blackListed token"
        })
    }
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "User not authorized",
            success: false,
            error: err.message
        })
    }
    req.user = decoded;
    next()
}