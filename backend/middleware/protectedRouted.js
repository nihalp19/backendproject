import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/user.model.js"

dotenv.config()


export const protectedRouted = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken

        if (!accessToken) {
            return res.status(401).json({ message: "Access token is required" })
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        const user = await User.findOne({ where: { id: decoded.userId } })
        if (!user) {
            return res.status(400).json({ message: "Access token is required" })
        }

        req.user = user

        next()
    } catch (error) {
        console.log("JWT middleware error:", error.message)
        return res.status(401).json({ message: "Invalid or expired token", error: error.message })
    }
}