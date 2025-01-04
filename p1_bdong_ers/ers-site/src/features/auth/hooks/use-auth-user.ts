import { useQuery, UseQueryResult } from '@tanstack/react-query';

export default function useAuthUser() : UseQueryResult<{data: string}> {
    return useQuery({
        queryKey: ['auth'],
        staleTime: 1000 * 60 * 5, // 5 mins
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      });
  }
