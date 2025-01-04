import { AppSidebar } from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import useAuthAdmin from '@/features/auth/hooks/use-auth-admin'
import useAuthUser from '@/features/auth/hooks/use-auth-user'
import useMe from '@/features/auth/hooks/use-me'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const { data: auth, isStale } = useAuthUser()
  const { data: isAdmin } = useAuthAdmin()
  const { data: myData } = useMe() // Querying the data early! Not sure why the enable:!! tag isn't enough for when I need it 
  
  useEffect(() => {
      if (!auth || isStale) {
        router.navigate({to: "/login"})
      }
  }, [auth]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
