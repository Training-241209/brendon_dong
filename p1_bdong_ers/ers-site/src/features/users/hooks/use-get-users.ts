import { axiosInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import useAuthUser from "@/features/auth/hooks/use-auth-user";

export default function UseGetUsers() {
    const router = useRouter();
    const { data: authToken } = useAuthUser();

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
        enabled: !!authToken,
        staleTime: 1000 * 60 * 5, // 5 mins
    });
}