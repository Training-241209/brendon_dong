import useMe from '@/features/auth/hooks/use-me';
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_authorized/_admin')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = useRouter()
  const { data: user, isStale, isLoading } = useMe()

  useEffect(() => {
      if (!user.admin || isStale) {
        router.navigate({to: "/login"})
      }
    }, [user]);
    
  return <> { isLoading ? <></> : <Outlet />} </>
}
