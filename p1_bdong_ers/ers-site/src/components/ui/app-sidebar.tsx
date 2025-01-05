// import GroupIcon from "src/assets/group.svg"
// import HomeIcon from "src/assets/home.svg"
// import MenuIcon from "src/assets/menu.svg"
// import RequestIcon from "src/assets/request.svg"
// import SidebarIcon from "src/assets/sidebar.svg"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "@tanstack/react-router"
import { adminItems, userItems } from "../constants/sidebarItems"
import useMe from "@/features/auth/hooks/use-me"
import { Avatar, AvatarFallback } from "./avatar"
 
export function AppSidebar() {
  const { data : user, isLoading } = useMe()
  const { open } = useSidebar()
  const currentPath = useLocation()
  return (<>
    { isLoading || !user ? <div className="bg-white"></div>:
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-end">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <SidebarGroup>
            <SidebarMenu className="max-w-full">
              { user.admin ? <> {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="text-nowrap" asChild>
                      <Link to={item.url} className={cn(currentPath.pathname == item.url ? "text-sidebar-accent-foreground bg-sidebar-accent" : "")}>
                        {item.icon && <item.icon />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              ))} </> : 
              <> {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="text-nowrap" asChild>
                    <Link to={item.url} className={cn(currentPath.pathname == item.url ? "text-sidebar-accent-foreground bg-sidebar-accent" : "")}>
                      {item.icon && <item.icon />}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}</>}
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        { open ? 
          <div className="overflow-hidden rounded-lg border bg-gray-200 text-nowrap text-center mx-2">{user.firstName} {user.lastName}</div>
          : <Avatar>
            <AvatarFallback className="bg-gray-200">{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
          </Avatar>
        }
      </SidebarFooter>
    </Sidebar>
    }
  </>)
}