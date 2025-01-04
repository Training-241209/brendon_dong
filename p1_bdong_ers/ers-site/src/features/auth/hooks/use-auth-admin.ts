import { axiosInstance } from '@/lib/axios-config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import useAuthUser from './use-auth-user';

export default function useAuthAdmin() : UseQueryResult<{data: string}> {
    const router = useRouter();
    const { data: authToken } = useAuthUser();
    
    return useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            try {
                const resp = await axiosInstance.get("/admin/me", {headers: {
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
        gcTime: 1000 * 60 * 10, // 10 mins
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      });
  }
