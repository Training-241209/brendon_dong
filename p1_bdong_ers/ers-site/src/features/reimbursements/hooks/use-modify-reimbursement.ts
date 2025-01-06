import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  reimbursementEditSchema } from "../schemas/reimbursement-schemas";
import { axiosInstance } from "@/lib/axios-config";
import useAuth from "@/features/auth/hooks/use-auth";
import { z } from "zod";

export default function useModifyReimbursement() {

    const queryClient = useQueryClient();
    const { data: authToken } = useAuth();

    // need to add reimbursement ID
    return useMutation({
        mutationFn: async (props : z.infer<typeof reimbursementEditSchema>) => {
            const request = await axiosInstance.patch(`/reimbursements/${props.reimbursementId}`, {
                description: props.description,
                amount: props.amount,
            }, { headers: {
                'Authorization': `${authToken}`
                }}
            );
            return request.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({queryKey: ["reimbursements"]})
        },
        onError: (err) => { console.log(err)}
    });
}