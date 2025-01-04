import useAuthAdmin from '@/features/auth/hooks/use-auth-admin'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_authorized/_admin')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = useRouter()
  const { data: isAdmin, isStale } = useAuthAdmin()

  useEffect(() => {
        if (!isAdmin || isStale) {
          router.navigate({to: "/login"})
        }
    }, [isAdmin]);
    
  return <Outlet />
}
