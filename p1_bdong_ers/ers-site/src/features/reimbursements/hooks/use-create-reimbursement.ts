import { axiosInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reimbursementCreationSchema } from "../schemas/reimbursement-schemas";
import { z } from "zod";
import useMe from "@/features/auth/hooks/use-me";
import useAuth from "@/features/auth/hooks/use-auth";

export default function UseCreateReimbursement() {

    const queryClient = useQueryClient()
    const { data: user } = useMe()
    const { data: authToken } = useAuth()

    return useMutation({
        mutationFn: async (props : z.infer<typeof reimbursementCreationSchema>) => {
            const request = await axiosInstance.post("/reimbursements", {
                description: props.description,
                amount: props.amount,
                userId: user.userId
            }, { 
                headers: {
                    'Authorization': `${authToken}`
                }
            })
            return request.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({queryKey: ["reimbursements"]})
            console.log("Reimbursement created")
        },
        onError: (err) => { console.log(err)}
    })
}