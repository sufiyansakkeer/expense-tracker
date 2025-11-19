import express from 'express';

import { getAllExpenses, createExpense, getExpenseById, updateExpense, deleteExpense } from '../controllers/expense.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';



const router = express.Router();

router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, getAllExpenses);
router.get("/:id", authMiddleware, getExpenseById);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

export default router;