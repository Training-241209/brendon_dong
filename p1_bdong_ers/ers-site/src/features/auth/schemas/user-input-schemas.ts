import { firstNameSchema, lastNameSchema } from "@/features/users/schemas/user-schemas";
import { z } from "zod";

export const usernameSchema = z.string().min(2, {
    message: "Username must be at least 2 characters.",
})

export const passwordSchema = z.string().min(8, {
    message: "Password must be at least 8 characters.",
})


export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const registerSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    firstName: firstNameSchema,
    lastName: lastNameSchema
})