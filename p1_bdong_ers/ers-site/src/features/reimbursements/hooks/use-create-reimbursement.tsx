import { axiosInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UseCreateReimbursement() {

    interface ReimbursementProps {
        description: String,
        amount: Number,
        userId: Number
    }

    return useMutation({
        mutationFn: async (props : ReimbursementProps) => {
            const request = await axiosInstance.post("/reimbursements", {
                description: props.description,
                amount: props.amount,
                userId: props.userId
            })

            return request.data;
        },
        onSuccess: () => {}
    });
}