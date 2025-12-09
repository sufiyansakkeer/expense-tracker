import { z } from "zod";

export const createCategorySchema = z.object({
  categoryName: z
    .string({
      required_error: "Category name is required",
    })
    .min(2, "Category name must be at least 2 characters"),

  categoryType: z.enum(
    ["salary", "shopping", "food", "transportation", "subscription", "other"],
    {
      required_error: "Category type is required",
    }
  ),

  type: z.enum(["income", "expense"], {
    required_error: "Type must be income or expense",
  }),
});
