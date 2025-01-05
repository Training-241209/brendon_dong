import { HomeIcon, UserPenIcon, LogOutIcon, UsersIcon, StampIcon } from "lucide-react"

export const userItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HomeIcon
    },
    {
      title: "My Account",
      url: "/account",
      icon: UserPenIcon
    },
    {
      title: "Logout",
      url: "/logout",
      icon: LogOutIcon
    }
]

export const adminItems = [
{
    title: "Dashboard",
    url: "/dashboard",
    icon: HomeIcon
},
{
    title: "Reimbursements",
    url: "/reimbursements",
    icon: StampIcon
},
{
    title: "Users",
    url: "/users",
    icon: UsersIcon
},
{
    title: "My Account",
    url: "/account",
    icon: UserPenIcon
},
{
    title: "Logout",
    url: "/logout",
    icon: LogOutIcon
}
]