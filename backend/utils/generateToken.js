import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const generatToken = (userId) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
    return token
}

