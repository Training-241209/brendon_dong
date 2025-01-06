import { AppSidebar } from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import useAuth from '@/features/auth/hooks/use-auth'
import useMe from '@/features/auth/hooks/use-me'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { LoaderIcon } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: auth, isStale, isLoading } = useAuth()
  const { data: me } = useMe()
  // const localStorageToken = localStorage.getItem("auth")
  
  useEffect(() => {
      if (!auth || isStale) {
        // if (localStorageToken) {
        //   queryClient.setQueryData(["auth"], localStorageToken)
        // } else {
          router.navigate({to: "/login"})
        // }
      }
  }, [auth]);

  return (<>
    {isLoading || !auth ? <LoaderIcon className="animate-spin" /> :
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    }</>)
}
