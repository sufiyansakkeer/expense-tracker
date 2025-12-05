import express from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { register, login, getCurrentUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";  

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post('/login', validate(loginSchema), login);

router.get('/me', authMiddleware, getCurrentUser);

export default router;