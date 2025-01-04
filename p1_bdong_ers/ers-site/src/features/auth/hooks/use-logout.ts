import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

//TODO: See if I actually want to use this as a custom hook later and if not, kill
export default function useLogout() {
    const queryClient = useQueryClient()
    const router = useRouter()

    // Invalidate ALL queries
    queryClient.invalidateQueries()
    router.navigate({to: "/login"})
}