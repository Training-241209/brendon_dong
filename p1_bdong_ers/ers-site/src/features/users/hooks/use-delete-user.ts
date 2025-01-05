import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import useAuth from "@/features/auth/hooks/use-auth";
import { toast } from "sonner";

export default function UseDeleteUser() {

    const queryClient = useQueryClient();
    const { data: authToken } = useAuth();

    return useMutation({
        mutationFn: async (props : { userId : Number}) => {
            const request = await axiosInstance.delete(`/users/${props.userId}`,
                { headers: {
                'Authorization': `${authToken}`
                }}
            );
            return request;
        },
        onSuccess: (response) => {
            console.log(response);
            console.log(response.data);
            queryClient.refetchQueries({queryKey: ["reimbursements"]})
            queryClient.refetchQueries({queryKey: ["users"]})
            toast.success(`User successfully deleted. Deleted ${response.data} reimbursements.`)
        },
        onError: (err) => {
            console.log(err)
            toast.error("Failed to delete user!")
        }
    });
}