import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.email("Valide email is required"),
    password: z.string().min(6, "Password must be at least 6 charecters"),
    phoneNumber: z.object({
        countryCode: z.string().regex(/^\+\d{1,3}$/, {
            message: "Country code must be like +91"
        }),
        number: z.string().regex(/^\d{7,12}$/, {
            message: "Number should only contain digits"
        })
    }),
});

export const loginSchema = z.object({
    email: z.email("Valide email is required"),
    password: z.string().min(6, "Password must be at least 6 charecters"),
});