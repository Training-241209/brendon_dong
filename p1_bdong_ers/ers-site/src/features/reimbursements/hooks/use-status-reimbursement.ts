import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reimbursementReviewSchema } from "../schemas/reimbursement-schemas";
import { axiosInstance } from "@/lib/axios-config";
import useAuth from "@/features/auth/hooks/use-auth";
import { z } from "zod";
import { toast } from "sonner";

export default function UseStatusReimbursement() {

    const queryClient = useQueryClient();
    const { data: authToken } = useAuth();
    
    return useMutation({
        mutationFn: async (props : z.infer<typeof reimbursementReviewSchema>) => {
            const request = await axiosInstance.patch("/reimbursements", {
                reimbursementId: props.reimbursementId,
                status: props.status.toUpperCase()
            }, { headers: {
                'Authorization': `${authToken}`
                }}
            );

            return request.data;
        },
        onSuccess: () => {
            toast.success("Successfully modified reimbursement status.")
            queryClient.refetchQueries({queryKey: ["reimbursements"]})
        },
        onError: () => {
            toast.error("Failed to change status!")
        }
    });
}