import { z } from "zod"

export default interface Reimbursement {
    description: String,
    amount: Number,
    status: String,
    userId: Number
}

export const reimbursementCreationSchema = z.object({
    amount: z.coerce.number().int().positive().finite(),
    description: z.string(),
})

export const reimbursementSubmitSchema = z.object({
    amount: z.coerce.number().int().positive().finite(),
    description: z.string(),
    userId: z.number().int()
})