import { axiosInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import useAuth from "@/features/auth/hooks/use-auth";

export default function useGetAllReimbursements() {

    const router = useRouter();
    const { data: authToken } = useAuth();

    return useQuery({
        queryKey: ["reimbursements", "all"],
        queryFn: async () => {
            try {
                const resp = await axiosInstance.get("/reimbursements", { headers: {
                    'Authorization': `${authToken}`
                }});
                return resp.data;
            } catch (e) {
                router.navigate({ to: "/dashboard" });
                return null;
            }
        },
        staleTime: 1000 * 60 * 15
    });
}