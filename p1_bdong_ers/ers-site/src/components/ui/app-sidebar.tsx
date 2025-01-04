// import GroupIcon from "src/assets/group.svg"
// import HomeIcon from "src/assets/home.svg"
// import MenuIcon from "src/assets/menu.svg"
// import RequestIcon from "src/assets/request.svg"
// import SidebarIcon from "src/assets/sidebar.svg"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { Link, useLocation } from "@tanstack/react-router"
import { adminItems, userItems } from "../constants/sidebarItems"
 


export function AppSidebar() {
  const queryClient = useQueryClient()
  const admin = queryClient.getQueryData(['admin']);
  const items = admin ? adminItems : userItems
  const currentPath = useLocation()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-end">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <SidebarGroup>
            <SidebarMenu className="max-w-full">
              {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className={cn(currentPath.pathname == item.url ? "text-sidebar-accent-foreground bg-sidebar-accent" : "")}>
                        {item.icon && <item.icon />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}