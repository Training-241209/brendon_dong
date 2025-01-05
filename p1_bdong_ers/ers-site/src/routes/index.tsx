import useAuth from '@/features/auth/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: auth, isStale } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth && !isStale) {
      router.navigate({to: "/dashboard"});
    } else {
      router.navigate({to: "/login"})
    }
  }, [auth]);

  return null;
}
