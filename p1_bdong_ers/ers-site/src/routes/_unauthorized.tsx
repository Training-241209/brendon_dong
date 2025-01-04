import useAuthAdmin from '@/features/auth/hooks/use-auth-admin'
import useAuthUser from '@/features/auth/hooks/use-auth-user'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_unauthorized')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const {data : auth, isStale} = useAuthUser()
  const {data : isAdmin } = useAuthAdmin()

  useEffect(() => {
    if (!isStale) {
      router.navigate({ to: '/dashboard' })
    }
  }, [auth])

  return <Outlet />
}
