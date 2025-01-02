// import GroupIcon from "src/assets/group.svg"
// import HomeIcon from "src/assets/home.svg"
// import MenuIcon from "src/assets/menu.svg"
// import RequestIcon from "src/assets/request.svg"
// import SidebarIcon from "src/assets/sidebar.svg"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { HomeIcon, Icon, LogOutIcon, UserPenIcon, UsersIcon } from "lucide-react"
 
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: HomeIcon
  },
  {
    title: "Users",
    url: "/users",
    icon: UsersIcon
  },
  {
    title: "My Info",
    url: "/",
    icon: UserPenIcon
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOutIcon
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup className="justify-end">
          <SidebarMenuItem>Test</SidebarMenuItem>
          <SidebarTrigger className="justify-end" />
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
            <SidebarMenu>
              {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
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