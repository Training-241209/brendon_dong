import { useMutation } from "@tanstack/react-query";
import Reimbursement from "../schemas/reimbursement-schemas";
import { axiosInstance } from "@/lib/axios-config";

export default function UseModifyReimbursement() {

    // need to add reimbursement ID
    return useMutation({
        mutationFn: async (props : Reimbursement) => {
            const request = await axiosInstance.patch("/reimbursements", {
                description: props.description,
                amount: props.amount,
            })

            return request.data;
        },
        onSuccess: () => {}
    });
}