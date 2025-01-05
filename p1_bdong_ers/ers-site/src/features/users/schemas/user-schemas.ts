import { z } from "zod"

export const firstNameSchema = z.string()

export const lastNameSchema = z.string()

export default interface User {
    firstName: String,
    lastName: String,
    username: String,
    password: String
}

export const userAccountModifySchema = z.object({
    username: z.string(),
    userId: z.number().int(),
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    roleName: z.string()
})

export const userViewSchema = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    userId: z.number(),
    roleName: z.string(),
})