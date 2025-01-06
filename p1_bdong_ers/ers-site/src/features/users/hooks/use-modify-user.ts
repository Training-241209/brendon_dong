import { axiosInstance } from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { userAccountModifySchema } from "../schemas/user-schemas";
import { z } from "zod";

export default function UseModifyUser() {

    return useMutation({
        mutationFn: async (props : z.infer<typeof userAccountModifySchema>) => {
            const request = await axiosInstance.post("/reimbursements", {
                firstName: props.firstName,
                lastName: props.lastName
            })

            return request.data;
        },
        onSuccess: () => {
            toast.success("Changed user info.")
        },
        onError: () => {
            toast.error("Failed to change user info.")
        }
    });
}