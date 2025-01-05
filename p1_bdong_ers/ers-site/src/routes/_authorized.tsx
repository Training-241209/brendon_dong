import { AppSidebar } from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import useAuth from '@/features/auth/hooks/use-auth'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { LoaderIcon } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const { data: auth, isStale, isLoading } = useAuth()
  
  useEffect(() => {
      if (!auth || isStale) {
        router.navigate({to: "/login"})
      }
  }, [auth]);

  return (<>
    {isLoading ? <LoaderIcon className="animate-spin" /> :
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    }</>)
}
