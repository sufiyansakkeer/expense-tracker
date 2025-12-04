import express from 'express';

import { getAllExpenses, createExpense, getExpenseById, updateExpense, deleteExpense } from '../controllers/expense.controller.js';

import { expenseBodySchema, expenseIdSchema } from '../validators/expense_validator.js';
import { validate } from '../middleware/validate.middleware.js';

import { authMiddleware } from '../middleware/auth.middleware.js';



const router = express.Router();

router.post("/", authMiddleware, validate(expenseBodySchema), createExpense);
router.get("/", authMiddleware, getAllExpenses);
router.get("/:id", authMiddleware, validate(expenseIdSchema), getExpenseById);
router.put("/:id", authMiddleware, validate(expenseIdSchema), validate(expenseBodySchema), updateExpense);
router.delete("/:id", authMiddleware, validate(expenseIdSchema), deleteExpense);

export default router;