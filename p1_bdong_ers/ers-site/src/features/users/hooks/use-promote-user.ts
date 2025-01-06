import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import useAuth from "@/features/auth/hooks/use-auth";
import { toast } from "sonner";

export default function usePromoteUser() {

    const queryClient = useQueryClient();
    const { data: authToken } = useAuth();

    return useMutation({
        mutationFn: async (id : Number) => {
            const request = await axiosInstance.patch(`/promote/${id}`, {},
                { headers: {
                'Authorization': `${authToken}`
                }}
            );
            return request.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({queryKey: ["users"]})
            toast.success("Successfully promoted user.")
        },
        onError: () => {
            toast.error("Failed to promote!")
        }
    });
}