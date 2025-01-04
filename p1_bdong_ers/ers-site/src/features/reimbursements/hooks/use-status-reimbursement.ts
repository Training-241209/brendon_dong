import { useMutation } from "@tanstack/react-query";
import Reimbursement from "../schemas/reimbursement-schemas";
import { axiosInstance } from "@/lib/axios-config";

export default function UseStatusReimbursement() {

    // Admin, need to add reimbursement ID
    return useMutation({
        mutationFn: async (props : Reimbursement) => {
            const request = await axiosInstance.post("/reimbursements", {
                status: props.status
            })

            return request.data;
        },
        onSuccess: () => {}
    });
}