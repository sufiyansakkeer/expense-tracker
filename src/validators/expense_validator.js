import { z } from "zod";

// Allowed types
const typeEnum = ["income", "expense"];

// Create & Update Schema
export const expenseBodySchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        amount: z.number().positive("Amount must be a positive number"),
        category: z.string().min(1, "Category is required"),
        type: z.enum(typeEnum, {
            errorMap: () => ({ message: "Type must be either 'income' or 'expense'" })
        }),
        description: z.string().optional(),
        date: z.string().refine(
            (val) => !isNaN(Date.parse(val)),
            { message: "Invalid date format" }
        )
    })
});

// ID validation schema (for GET/UPDATE/DELETE by ID)
export const expenseIdSchema = z.object({
    params: z.object({
        id: z.string().length(24, "Invalid expense ID")
    })
});
