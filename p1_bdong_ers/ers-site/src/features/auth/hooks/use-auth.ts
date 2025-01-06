import { useQuery, UseQueryResult } from '@tanstack/react-query';

export default function useAuth() : UseQueryResult<{data: string}> {
    return useQuery({
        queryKey: ['auth'],
        staleTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      });
  }
