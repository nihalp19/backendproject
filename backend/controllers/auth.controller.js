import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const register = async (req, res) => {
    try {
        const parsed = RegisterSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }

        const { name, email, password } = parsed.data;

        const isUserExists = await User.findOne({ where: { email } });

        if (isUserExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const LoginSchema = z.object({
    email: z.string().email(1, "Inavlid email format"),
    password: z.string().min(1, "Password must be at least 6 characters")
})


export const login = async (req, res) => {
    try {
        const parsed = LoginSchema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }

        const { email, password } = parsed.data;


        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const accessToken = generatToken(user.id)

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Optional
            sameSite: "lax",
        });
        res.status(200).json({ message: "Login successfull" })
    } catch (error) {
        console.log("error while login", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}



