import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res, next) => {

    try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,


        });
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        next(error);

    }

});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        next(error);
    }
});

export default router;