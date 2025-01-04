import { z } from "zod"

// make it back-end focused?
export default interface User {
    firstName: String,
    lastName: String,
    username: String,
    password: String
}

export const userModifySchema = z.object({
    firstName: z.string(),
    lastName: z.string()
})