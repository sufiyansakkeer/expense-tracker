import mongoose from "mongoose";
import { z } from "zod";
import Category from "../models/category.model.js";



// Create & Update Schema
export const expenseBodySchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        amount: z.number().positive("Amount must be a positive number"),
        category: z.string().refine( async (val) => {
            if (!mongoose.Types.ObjectId.isValid(val)) {
                return false;
            }
     const category = await Category.findOne({ _id: val, isDeleted: false });
            return !!category;
        },{
            message: "Category does not exist",
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
