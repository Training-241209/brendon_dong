import { axiosInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import useAuth from "./use-auth";

export default function useMe() {
    const router = useRouter();
    const { data: authToken } = useAuth();

    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            try {
                const resp = await axiosInstance.get("/users/me", { headers: {
                    'Authorization': `${authToken}`
                }});
                return resp.data;
            } catch (e) {
                console.error(e);
                router.navigate({ to: "/login" });
                return null;
            }
        },
        enabled: !!authToken,
        staleTime: 1000 * 60 * 2
    });
}