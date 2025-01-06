import useAuth from '@/features/auth/hooks/use-auth'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_unauthorized')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const {data : auth, isStale} = useAuth()

  useEffect(() => {
    if (!isStale) {
      router.navigate({ to: '/dashboard' })
    }
  }, [auth])

  return <Outlet />
}
