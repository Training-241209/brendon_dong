import useAuth from '@/features/auth/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("RETURNING AUTH OBJECT");
    console.log(auth);
    if (auth) {
      router.navigate({to: "/dashboard"});
    } else {
      router.navigate({to: "/login"})
    }
  }, [auth]);

  return null;
}
