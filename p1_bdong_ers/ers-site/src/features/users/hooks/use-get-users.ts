import { axiosInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import useAuth from "@/features/auth/hooks/use-auth";

export default function useGetUsers() {
    const router = useRouter();
    const { data: authToken } = useAuth();

    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const resp = await axiosInstance.get("/users", {headers: {
                    'Authorization': `${authToken}`
                }});
                return resp.data;
            } catch (e) {
                console.error(e);
                router.navigate({ to: "/dashboard" });
                return null;
            }
        },
        staleTime: 1000 * 60 * 15
    });
}