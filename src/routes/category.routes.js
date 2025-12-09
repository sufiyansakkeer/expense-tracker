import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  restoreCategory,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createCategorySchema } from "../validators/category.validator.js";

const router = express.Router();

// POST category with validation
router.post("/", authMiddleware, validate(createCategorySchema), createCategory);

router.get("/", authMiddleware, getCategories); 
router.delete("/:id", authMiddleware, deleteCategory);
router.patch("/:id/restore", authMiddleware, restoreCategory); 

export default router;
