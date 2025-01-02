import { axiosInstance } from '@/lib/axios-config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export default function useAuth() {
    const router = useRouter();
    return useQuery({
        queryKey: ['auth'],
        queryFn: (obj) => {
          console.log("RETURNING QUERY OBJECT");
          console.log(obj);
        },
        staleTime: 1000 * 60 * 5, // 5 mins
        gcTime: 1000 * 60 * 10, // 10 mins
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      });
  }