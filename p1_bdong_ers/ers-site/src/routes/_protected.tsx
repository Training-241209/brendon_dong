import { AppSidebar } from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
