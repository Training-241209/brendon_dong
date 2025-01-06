import { z } from "zod"

export default interface Reimbursement {
    description: String,
    amount: Number,
    status: String,
    userId: Number
}

export const reimbursementCreationSchema = z.object({
    amount: z.coerce.number().int().positive().finite(),
    description: z.string().nonempty(),
})

export const reimbursementReviewSchema = z.object({
    status: z.string(),
    reimbursementId: z.number()
})

export const reimbursementEditSchema = z.object({
    reimbursementId: z.number(),
    amount: z.coerce.number().int().positive().finite(),
    description: z.string().nonempty(),
})

export const reimbursementSubmitSchema = z.object({
    amount: z.coerce.number().int().positive().finite(),
    description: z.string().nonempty(),
    userId: z.number().int()
})

export const reimbursementDisplaySchema = z.object({
    reimbursementId: z.number(),
    amount: z.number(),
    description: z.string(),
    status: z.enum(["PENDING", "ACCEPTED", "DENIED"]),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string()
})